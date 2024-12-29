import { Form, Input, InputNumber, Button, Card, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useNfzClaimsStore } from '../../stores/nfzClaimsStore'
import { useEffect } from 'react'

const NfzClaimForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { addClaim, updateClaim, claims } = useNfzClaimsStore()

  useEffect(() => {
    if (id) {
      const claim = claims.find(c => c.id === parseInt(id))
      if (claim) {
        form.setFieldsValue(claim)
      }
    }
  }, [id, claims])

  const onFinish = async (values) => {
    try {
      if (values.availableQuantity > values.initialQuantity) {
        message.error('Ilość dostępna nie może być większa niż początkowa')
        return
      }

      if (id) {
        await updateClaim(parseInt(id), values)
      } else {
        await addClaim(values)
      }
      message.success('Zapisano pomyślnie')
      navigate(-1)
    } catch (error) {
      message.error('Wystąpił błąd')
    }
  }

  return (
    <Card title={id ? 'Edytuj wniosek NFZ' : 'Nowy wniosek NFZ'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="claimCode"
          label="Kod wniosku"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="initialQuantity"
          label="Ilość początkowa"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name="availableQuantity"
          label="Ilość dostępna"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="info"
          label="Informacje dodatkowe"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {id ? 'Zapisz zmiany' : 'Dodaj wniosek'}
            </Button>
            <Button onClick={() => navigate(-1)}>
              Anuluj
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default NfzClaimForm
