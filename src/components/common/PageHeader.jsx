import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const PageHeader = ({ title, onAdd, addButtonText }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '16px 24px',
      background: '#fff',
      borderRadius: '8px',
      marginBottom: '16px'
    }}>
      <Title level={4} style={{ margin: 0 }}>{title}</Title>
      {onAdd && (
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      )}
    </div>
  )
}

export default PageHeader
