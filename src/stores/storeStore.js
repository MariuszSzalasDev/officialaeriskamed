import { create } from 'zustand'

export const useStoreStore = create((set, get) => ({
  stores: [
    { id: 1, name: 'Sklep Medyczny Warszawa', address: 'ul. Przykładowa 1, Warszawa' },
    { id: 2, name: 'Sklep Medyczny Kraków', address: 'ul. Testowa 2, Kraków' }
  ],
  currentStore: null,
  loading: false,

  initializeStore: () => {
    const savedStore = localStorage.getItem('currentStore')
    if (savedStore) {
      set({ currentStore: JSON.parse(savedStore) })
    }
  },

  fetchStores: async () => {
    set({ loading: true })
    try {
      // W przyszłości zastąpić wywołaniem API
      const stores = get().stores
      set({ stores })
    } finally {
      set({ loading: false })
    }
  },

  setCurrentStore: (store) => {
    set({ currentStore: store })
    localStorage.setItem('currentStore', JSON.stringify(store))
  },

  addStore: async (store) => {
    set({ loading: true })
    try {
      const newStore = { ...store, id: Date.now() }
      set(state => ({ stores: [...state.stores, newStore] }))
    } finally {
      set({ loading: false })
    }
  },

  clearCurrentStore: () => {
    set({ currentStore: null })
    localStorage.removeItem('currentStore')
  }
}))
