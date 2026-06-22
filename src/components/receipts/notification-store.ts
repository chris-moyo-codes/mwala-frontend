import { create } from 'zustand';
import { Notification } from '@/components/layout/NotificationCenter'; // Import the Notification interface

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void; // Added as it's used in NotificationCenter
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => set((state) => {
    const newNotifications = [notification, ...state.notifications];
    const newUnreadCount = notification.read ? state.unreadCount : state.unreadCount + 1;
    return { notifications: newNotifications, unreadCount: newUnreadCount };
  }),

  markAsRead: (id) => set((state) => {
    const notificationToMark = state.notifications.find(n => n.id === id);
    if (notificationToMark && !notificationToMark.read) {
      const newNotifications = state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      return { notifications: newNotifications, unreadCount: state.unreadCount - 1 };
    }
    return state; // No change if not found or already read
  }),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),

  removeNotification: (id) => set((state) => {
    const notificationToRemove = state.notifications.find(n => n.id === id);
    const newUnreadCount = (notificationToRemove && !notificationToRemove.read) ? state.unreadCount - 1 : state.unreadCount;
    return { notifications: state.notifications.filter(n => n.id !== id), unreadCount: newUnreadCount };
  }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));