import { Layout } from 'antd'
import AppHeader from './components/layout/AppHeader'
import AppSidebar from './components/layout/AppSidebar'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useStoreStore } from './stores/storeStore'
import StoreSelector from './pages/StoreSelector'

const { Content } = Layout

function App() {
  const { checkAuth } = useAuthStore()
  const { currentStore, initializeStore } = useStoreStore()

  useEffect(() => {
    checkAuth()
    initializeStore()
  }, [])

  if (!currentStore) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px', padding: 24 }}>
          <StoreSelector />
        </Content>
      </Layout>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#f0f2f5' }}>
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
