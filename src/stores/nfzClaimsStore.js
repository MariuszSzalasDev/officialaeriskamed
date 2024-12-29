import { create } from 'zustand'
import { useAuthStore } from './authStore'

export const useNfzClaimsStore = create((set, get) => ({
  claims: [],
  loading: false,

  fetchClaims: async (patientId) => {
    set({ loading: true })
    try {
      // TODO: Replace with API call
      const mockClaims = [
        {
          id: 1,
          patientId,
          claimCode: 'NFZ/2023/001',
          initialQuantity: 100,
          availableQuantity: 75,
          info: 'Wózek inwalidzki',
          storeId: 1,
          history: [
            {
              date: new Date(),
              user: 'Admin',
              action: 'created',
              details: 'Utworzono wniosek'
            }
          ]
        }
      ]
      set({ claims: mockClaims })
    } finally {
      set({ loading: false })
    }
  },

  addClaim: async (claim) => {
    set({ loading: true })
    try {
      const user = useAuthStore.getState().user
      const newClaim = {
        ...claim,
        id: Date.now(),
        history: [{
          date: new Date(),
          user: user.name,
          action: 'created',
          details: 'Utworzono wniosek'
        }]
      }
      set(state => ({ claims: [...state.claims, newClaim] }))
    } finally {
      set({ loading: false })
    }
  },

  updateClaim: async (id, updates) => {
    set({ loading: true })
    try {
      const user = useAuthStore.getState().user
      set(state => ({
        claims: state.claims.map(claim => 
          claim.id === id 
            ? {
                ...claim,
                ...updates,
                history: [...claim.history, {
                  date: new Date(),
                  user: user.name,
                  action: 'updated',
                  details: 'Zaktualizowano wniosek'
                }]
              }
            : claim
        )
      }))
    } finally {
      set({ loading: false })
    }
  }
}))
