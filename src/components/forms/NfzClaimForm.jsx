import { Form, Input, InputNumber, Modal } from 'antd'
import { useEffect } from 'react'

const NfzClaimForm = ({ open, onCancel, onSave, initialValues, title }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        if (values.availableQuantity > values.initialQuantity) {
          form.setFields([{
            name: 'availableQuantity',
            errors: ['Ilość dostępna nie może być większa niż początkowa']
          }])
          return
        }
        onSave(values)
        form.resetFields()
      })
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="claimCode"
          label="Kod wniosku"
          rules={[{ required: true, message: 'Proszę podać kod wniosku' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="initialQuantity"
          label="Ilość początkowa"
          rules={[{ required: true, message: 'Proszę podać ilość początkową' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="availableQuantity"
          label="Ilość dostępna"
          rules={[{ required: true, message: 'Proszę podać ilość dostępną' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="info"
          label="Informacje dodatkowe"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NfzClaimForm
