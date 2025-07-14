import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/AppContext";
import io from "socket.io-client";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mobileNumber } = useContext(Context);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    if (mobileNumber) {
      // Connect to socket server - use import.meta.env for Vite
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
      
      // Join user's room
      socketRef.current.emit('register', mobileNumber);
      
      // Listen for pharmacy booking acceptance
      socketRef.current.on('pharmacyBookingAccepted', (data) => {
        console.log('🔔 Real-time notification received:', data);
        addNotification({
          message: data.message,
          serviceType: data.serviceType,
          bookingId: data.bookingId,
          pharmacyName: data.pharmacyName,
          createdAt: new Date(),
          isRead: false
        });
      });

      // Listen for new booking requests (for pharmacy dashboard)
      socketRef.current.on('newBookingRequest', (data) => {
        console.log('🔔 New booking request received:', data);
        addNotification({
          message: data.message,
          serviceType: data.serviceType,
          bookingId: data.bookingId,
          patientName: data.patientName,
          createdAt: new Date(),
          isRead: false
        });
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [mobileNumber]);

  // Add new notification to the list
  const addNotification = (newNotification) => {
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Fetch notifications from API
  useEffect(() => {
    if (!mobileNumber) {
      console.debug("[Notifications] No mobileNumber in context; skipping fetch.");
      setNotifications([]);
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.debug(`[Notifications] Fetching notifications for mobileNumber: ${mobileNumber}`);
        
        const response = await fetch(`/api/notifications/pwa?mobileNumber=${mobileNumber}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setNotifications(data.notifications || []);
          setUnreadCount(data.notifications?.filter(n => !n.isRead).length || 0);
        } else {
          console.error("[Notifications] API responded with failure:", data.message);
          setNotifications([]);
          setError(data.message);
        }
      } catch (error) {
        console.error("[Notifications] Failed to fetch notifications:", error);
        setNotifications([]);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [mobileNumber]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => 
            n._id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        setUnreadCount(prev => {
          const deletedNotification = notifications.find(n => n._id === notificationId);
          return deletedNotification && !deletedNotification.isRead ? Math.max(0, prev - 1) : prev;
        });
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    // Navigate based on service type
    if (notification.serviceType === 'Medicine') {
      navigate('/bookings?type=medicine');
    } else if (notification.serviceType === 'Vaccination') {
      navigate('/bookings?type=vaccination');
    } else {
      navigate('/bookings');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      await Promise.all(
        unreadNotifications.map(n => 
          fetch(`/api/notifications/${n._id}/read`, { method: 'PUT' })
        )
      );

      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      await Promise.all(
        notifications.map(n => 
          fetch(`/api/notifications/${n._id}`, { method: 'DELETE' })
        )
      );

      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to clear all notifications:', error);
    }
  };

  // Get notification icon based on service type
  const getNotificationIcon = (serviceType) => {
    switch (serviceType) {
      case 'Medicine':
        return '/src/assets/icons/service-medicine.svg';
      case 'Vaccination':
        return '/src/assets/icons/services-vaccination.svg';
      default:
        return '/src/assets/icons/notification-bell-icon.svg';
    }
  };

  // Get notification color based on status
  const getNotificationColor = (notification) => {
    if (!notification.isRead) {
      return 'bg-blue-50 border-l-4 border-blue-500';
    }
    return 'bg-gray-50 border-l-4 border-gray-300';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="sm:w-[100vw] h-[100vh] bg-white">
      <main className="sm:mx-[120px] pt-[24px] pb-[48px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
            <img
              src="/src/assets/icons/arrow-left-black-Icon.svg"
              alt="Back"
              className="h-6 w-6 mr-2"
            />
            <h1 className="font-Montserrat text-2xl font-bold text-gray-800">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={notification._id || index}
                className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md ${getNotificationColor(notification)}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={getNotificationIcon(notification.serviceType)}
                    alt="Notification icon"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {notification.message}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification._id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <img
                            src="/src/assets/icons/close.svg"
                            alt="Delete"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {notification.serviceType && (
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                            {notification.serviceType}
                          </span>
                        )}
                        {notification.pharmacyName && (
                          <span className="text-gray-600">
                            by {notification.pharmacyName}
                          </span>
                        )}
                      </span>
                      
                      <span>
                        {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notification.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-8 p-12">
            <img
              src="/src/assets/icons/notifications-empty.svg"
              alt="No notifications"
              className="w-24 h-24 opacity-50"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-500">
                {mobileNumber 
                  ? "You'll see notifications here when pharmacies respond to your bookings."
                  : "Please log in to see your notifications."
                }
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
