import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const PharmacyDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  // Initialize socket connection for real-time notifications
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    
    // Listen for new booking requests
    socketRef.current.on('newPharmacyBooking', (data) => {
      console.log('🔔 New pharmacy booking received:', data);
      addNotification({
        message: data.message,
        serviceType: data.serviceType,
        bookingId: data.bookingId,
        patientName: data.patientName,
        patientMobile: data.patientMobile,
        createdAt: new Date(),
        isRead: false
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Add new notification to the list
  const addNotification = (newNotification) => {
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Fetch existing notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/notifications/pharmacy');
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setNotifications(data.notifications || []);
        } else {
          console.error("API responded with failure:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Accept booking
  const acceptBooking = async (notification) => {
    try {
      const response = await fetch('/api/notifications/pharmacy-to-pwa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: notification.userId,
          bookingId: notification.bookingId,
          pharmacyName: 'Your Pharmacy Name', // This should come from pharmacy context
          pharmacyId: 'pharmacy-id', // This should come from pharmacy context
          patientName: notification.patientName,
          patientMobile: notification.patientMobile,
          serviceType: notification.serviceType
        })
      });

      if (response.ok) {
        // Remove the notification from the list
        setNotifications(prev => prev.filter(n => n._id !== notification._id));
        
        // Show success message
        alert('Booking accepted successfully! Patient has been notified.');
      } else {
        throw new Error('Failed to accept booking');
      }
    } catch (error) {
      console.error('Failed to accept booking:', error);
      alert('Failed to accept booking. Please try again.');
    }
  };

  // Reject booking
  const rejectBooking = async (notification) => {
    try {
      // Update notification status to rejected
      const response = await fetch(`/api/notifications/${notification._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'rejected'
        })
      });

      if (response.ok) {
        // Remove the notification from the list
        setNotifications(prev => prev.filter(n => n._id !== notification._id));
        
        alert('Booking rejected successfully!');
      } else {
        throw new Error('Failed to reject booking');
      }
    } catch (error) {
      console.error('Failed to reject booking:', error);
      alert('Failed to reject booking. Please try again.');
    }
  };

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
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pharmacy Dashboard
          </h1>
          <p className="text-gray-600">
            Manage incoming booking requests from patients
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Notifications */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification._id || index}
                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                  notification.isRead ? 'border-gray-300' : 'border-blue-500'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={getNotificationIcon(notification.serviceType)}
                    alt="Service icon"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {notification.message}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {notification.serviceType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      <p><strong>Patient:</strong> {notification.patientName}</p>
                      <p><strong>Mobile:</strong> {notification.patientMobile}</p>
                      <p><strong>Booking ID:</strong> {notification.bookingId}</p>
                      <p><strong>Received:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => acceptBooking(notification)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Accept Booking
                      </button>
                      
                      <button
                        onClick={() => rejectBooking(notification)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject Booking
                      </button>
                      
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <img
                src="/src/assets/icons/notifications-empty.svg"
                alt="No notifications"
                className="w-24 h-24 mx-auto mb-4 opacity-50"
              />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No booking requests
              </h3>
              <p className="text-gray-500">
                New booking requests from patients will appear here in real-time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard; 