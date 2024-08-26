import { useEffect } from 'react';
import axios from 'axios';

const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Notification permission is required to receive task reminders.');
    }
  }
};

const sendNotification = (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
};

const checkAndNotify = async (priority) => {
  try {
    const response = await axios.get('http://localhost:5000/api/tasks/tasks-by-priority');
    const tasks = response.data[priority];

    if (tasks.length > 0) {
      sendNotification(
        `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Tasks`,
        `Complete your ${priority.toUpperCase()} priority tasks.`
      );
    }
  } catch (error) {
    console.error('Error checking tasks:', error);
  }
};

const scheduleNotifications = () => {
  const now = new Date();
  const scheduleTime = (hour, minute, priority) => {
    const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }
    const timeUntilNotification = notificationTime - now;
    setTimeout(() => {
      checkAndNotify(priority);
      setInterval(() => checkAndNotify(priority), 24 * 60 * 60 * 1000); // Repeat daily
    }, timeUntilNotification);
  };

  // Schedule notifications for high priority tasks
  scheduleTime(14, 0, 'high'); // 2 PM
  scheduleTime(18, 0, 'high'); // 6 PM
  scheduleTime(22, 0, 'high'); // 10 PM

  // Schedule notifications for medium priority tasks
  scheduleTime(14, 0, 'medium'); // 2 PM
  scheduleTime(22, 0, 'medium'); // 10 PM

  // Schedule notifications for low priority tasks
  scheduleTime(22, 0, 'low'); // 10 PM
};

const TaskNotification = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        scheduleNotifications();
      }
    };

    setupNotifications();
  }, []);

  return null;
};

export default TaskNotification;
