import { create } from 'zustand'

export const usePatientsStore = create((set, get) => ({
  patients: [],
  loading: false,

  fetchPatients: async () => {
    set({ loading: true })
    try {
      // TODO: Replace with actual API call
      const mockPatients = [
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', phone: '123456789' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com', phone: '987654321' },
      ]
      set({ patients: mockPatients })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  getPatient: (id) => {
    return get().patients.find(p => p.id === parseInt(id))
  },

  addPatient: async (patient) => {
    set({ loading: true })
    try {
      // TODO: Replace with actual API call
      const newPatient = { ...patient, id: Date.now() }
      set(state => ({ patients: [...state.patients, newPatient] }))
      return newPatient
    } finally {
      set({ loading: false })
    }
  },

  updatePatient: async (id, patient) => {
    set({ loading: true })
    try {
      // TODO: Replace with actual API call
      set(state => ({
        patients: state.patients.map(p => 
          p.id === parseInt(id) ? { ...p, ...patient } : p
        )
      }))
    } finally {
      set({ loading: false })
    }
  },

  deletePatient: async (id) => {
    set({ loading: true })
    try {
      // TODO: Replace with actual API call
      set(state => ({
        patients: state.patients.filter(p => p.id !== id)
      }))
    } finally {
      set({ loading: false })
    }
  }
}))
