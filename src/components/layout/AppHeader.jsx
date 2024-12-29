import { Layout, Dropdown, Space, Avatar, Badge, Button } from 'antd'
import { UserOutlined, BellOutlined, ShopOutlined } from '@ant-design/icons'
import { useAuthStore } from '../../stores/authStore'
import { useNotificationsStore } from '../../stores/notificationsStore'
import { useStoreStore } from '../../stores/storeStore'

const { Header } = Layout

const AppHeader = () => {
  const { logout, user } = useAuthStore()
  const { notifications } = useNotificationsStore()
  const { currentStore, clearCurrentStore } = useStoreStore()

  const userMenuItems = {
    items: [
      {
        key: 'logout',
        label: 'Wyloguj',
        onClick: logout
      }
    ]
  }

  const notificationItems = {
    items: notifications.length > 0 
      ? notifications.map((notification, index) => ({
          key: index,
          label: notification.message
        }))
      : [{
          key: 'empty',
          label: 'Brak powiadomień',
          disabled: true
        }]
  }

  return (
    <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Space>
        <ShopOutlined />
        <span>{currentStore?.name}</span>
        <Button type="link" onClick={clearCurrentStore}>
          Zmień sklep
        </Button>
      </Space>
      
      <Space size={16}>
        <Dropdown menu={notificationItems} placement="bottomRight" trigger={['click']}>
          <Badge count={notifications.length} title={notifications.length === 0 ? "Brak powiadomień" : ""}>
            <BellOutlined style={{ fontSize: '20px' }} />
          </Badge>
        </Dropdown>
        
        <Dropdown menu={userMenuItems}>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span>{user?.name}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  )
}

export default AppHeader
