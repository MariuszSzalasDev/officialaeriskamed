import { create } from 'zustand'

export const useNotificationsStore = create((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    set(state => ({
      notifications: [...state.notifications, notification]
    }))
  },

  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },

  checkLowStock: (claims) => {
    const LOW_STOCK_THRESHOLD = 10
    claims.forEach(claim => {
      if (claim.availableQuantity <= LOW_STOCK_THRESHOLD) {
        set(state => ({
          notifications: [...state.notifications, {
            id: Date.now(),
            message: `Niski stan asortymentu (${claim.availableQuantity}) dla wniosku ${claim.claimCode} w sklepie ${claim.storeName}`,
            type: 'warning'
          }]
        }))
      }
    })
  }
}))
