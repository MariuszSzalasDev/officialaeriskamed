import { Card, List, Button } from 'antd'
import { useStoreStore } from '../stores/storeStore'
import { useEffect } from 'react'

const StoreSelector = () => {
  const { stores, fetchStores, setCurrentStore, loading } = useStoreStore()

  useEffect(() => {
    fetchStores()
  }, [])

  const handleStoreSelect = (store) => {
    setCurrentStore(store)
  }

  return (
    <Card title="Wybierz sklep">
      <List
        loading={loading}
        dataSource={stores}
        renderItem={store => (
          <List.Item>
            <List.Item.Meta
              title={store.name}
              description={store.address}
            />
            <Button type="primary" onClick={() => handleStoreSelect(store)}>
              Wybierz
            </Button>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default StoreSelector
