import { Form, Input, Modal } from 'antd'

const PatientForm = ({ open, onCancel, onSave, initialValues, title }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        form.resetFields()
        onSave(values)
      })
  }

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Imię i Nazwisko"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            { type: 'email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Adres"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PatientForm
