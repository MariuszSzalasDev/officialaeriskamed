import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import PatientsList from '../pages/patients/PatientsList'
import PatientForm from '../pages/patients/PatientForm'
import NfzClaimsList from '../pages/nfz/NfzClaimsList'
import NfzClaimForm from '../pages/nfz/NfzClaimForm'
import StoreSettings from '../pages/settings/StoreSettings'
import NotificationSettings from '../pages/settings/NotificationSettings'
import { useAuthStore } from '../stores/authStore'
import { useStoreStore } from '../stores/storeStore'

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore()
  const { currentStore } = useStoreStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!currentStore && window.location.pathname !== '/select-store') {
    return <Navigate to="/select-store" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<PatientsList />} />
      <Route path="/patients/new" element={<PatientForm />} />
      <Route path="/patients/:id" element={<PatientForm />} />
      <Route path="/nfz-claims" element={<NfzClaimsList />} />
      <Route path="/nfz-claims/new" element={<NfzClaimForm />} />
      <Route path="/nfz-claims/:id" element={<NfzClaimForm />} />
      <Route path="/settings/stores" element={<StoreSettings />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
    </Routes>
  )
}

export default AppRoutes
