import { Form, InputNumber, Button } from 'antd'
import { useStoreStore } from '../../stores/storeStore'
import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'

const NotificationSettings = () => {
  const { currentStore } = useStoreStore()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedThreshold = localStorage.getItem(`notificationThreshold_${currentStore.id}`)
    if (savedThreshold) {
      form.setFieldsValue({ threshold: parseInt(savedThreshold) })
    }
  }, [currentStore.id])

  const handleSave = (values) => {
    setLoading(true)
    try {
      localStorage.setItem(`notificationThreshold_${currentStore.id}`, values.threshold)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Zarządzanie powiadomieniami" />

      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: '8px'
      }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{ threshold: 10 }}
        >
          <Form.Item
            label={`Próg powiadomień dla ${currentStore.name}`}
            extra="Po osiągnięciu tej wartości zostanie wysłane powiadomienie o niskim stanie asortymentu"
          >
            <Form.Item
              name="threshold"
              rules={[{ required: true, message: 'Proszę podać próg powiadomień' }]}
              noStyle
            >
              <InputNumber 
                min={1} 
                style={{ width: 200 }} 
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Zapisz
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default NotificationSettings
