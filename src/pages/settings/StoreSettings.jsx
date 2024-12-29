import { Table, Button, Modal, Form, Input } from 'antd'
import { useState } from 'react'
import { useStoreStore } from '../../stores/storeStore'
import PageHeader from '../../components/common/PageHeader'

const StoreSettings = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { stores, addStore, loading } = useStoreStore()

  const columns = [
    {
      title: 'Nazwa sklepu',
      dataIndex: 'name',
    },
    {
      title: 'Adres',
      dataIndex: 'address',
    }
  ]

  const handleAdd = async (values) => {
    await addStore(values)
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <>
      <PageHeader 
        title="Zarządzanie sklepami" 
        onAdd={() => setIsModalVisible(true)}
        addButtonText="Dodaj sklep"
      />

      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: '8px'
      }}>
        <Table
          columns={columns}
          dataSource={stores}
          rowKey="id"
          loading={loading}
        />
      </div>

      <Modal
        title="Dodaj nowy sklep"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdd}
        >
          <Form.Item
            name="name"
            label="Nazwa sklepu"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Adres"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Dodaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StoreSettings
