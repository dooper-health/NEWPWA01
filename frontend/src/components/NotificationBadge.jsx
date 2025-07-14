import React, { useState, useEffect, useContext, useRef } from 'react';
import Context from '../context/AppContext';
import io from 'socket.io-client';

const NotificationBadge = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { mobileNumber } = useContext(Context);
  const socketRef = useRef(null);

  // Initialize socket connection for real-time updates
  useEffect(() => {
    if (mobileNumber) {
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
      
      // Join user's room
      socketRef.current.emit('register', mobileNumber);
      
      // Listen for pharmacy booking acceptance
      socketRef.current.on('pharmacyBookingAccepted', () => {
        setUnreadCount(prev => prev + 1);
      });

      // Listen for new booking requests
      socketRef.current.on('newBookingRequest', () => {
        setUnreadCount(prev => prev + 1);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [mobileNumber]);

  // Fetch initial unread count
  useEffect(() => {
    if (!mobileNumber) {
      setUnreadCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(`/api/notifications/count?mobileNumber=${mobileNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUnreadCount(data.count || 0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();
  }, [mobileNumber]);

  if (unreadCount === 0) {
    return (
      <div 
        className="relative cursor-pointer p-2"
        onClick={onClick}
      >
        <img
          src="/src/assets/icons/notification-bell-icon.svg"
          alt="Notifications"
          className="w-6 h-6 text-gray-600"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative cursor-pointer p-2"
      onClick={onClick}
    >
      <img
        src="/src/assets/icons/notification-bell-icon.svg"
        alt="Notifications"
        className="w-6 h-6 text-gray-600"
      />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    </div>
  );
};

export default NotificationBadge; 