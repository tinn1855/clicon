import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock user data - you can customize this based on email
          const mockUser: User = {
            id: '1',
            email,
            firstName: email.includes('john') ? 'John' : 'User',
            lastName: email.includes('john') ? 'Doe' : 'Name',
            addresses: [],
            createdAt: new Date().toISOString(),
          };

          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify(mockUser));

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => {
        set({ isLoading: true });

        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Create new user
          const newUser: User = {
            id: Date.now().toString(), // Generate a unique ID
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            addresses: [],
            createdAt: new Date().toISOString(),
          };

          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify(newUser));

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('checkoutInfo');

        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({
            user: updatedUser,
          });
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
