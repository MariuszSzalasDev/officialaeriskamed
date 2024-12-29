import { Layout, Menu } from 'antd'
import { DashboardOutlined, UserOutlined, FileOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Sider } = Layout

const AppSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: '/patients',
      icon: <UserOutlined />,
      label: 'Pacjenci'
    },
    {
      key: '/nfz-claims',
      icon: <FileOutlined />,
      label: 'Wnioski NFZ'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Ustawienia',
      children: [
        {
          key: '/settings/stores',
          label: 'Sklepy'
        },
        {
          key: '/settings/notifications',
          label: 'Powiadomienia'
        }
      ]
    }
  ]

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" style={{ color: 'white', textAlign: 'center', lineHeight: '32px' }}>
        AerisKMed
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['settings']}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}

export default AppSidebar
