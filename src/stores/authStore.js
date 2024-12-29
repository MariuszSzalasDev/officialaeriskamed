import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  checkAuth: () => {
    // TODO: Implement actual auth check
    set({ isAuthenticated: true, user: { name: 'Admin' } })
  },

  login: async (credentials) => {
    set({ loading: true })
    try {
      // TODO: Implement actual login
      set({ isAuthenticated: true, user: { name: 'Admin' } })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  }
}))
