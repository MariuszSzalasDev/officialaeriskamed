import { Form, Input, Button, Card, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { usePatientsStore } from '../../stores/patientsStore'
import { useEffect } from 'react'

const PatientForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { addPatient, updatePatient, getPatient } = usePatientsStore()

  useEffect(() => {
    if (id) {
      const patient = getPatient(id)
      form.setFieldsValue(patient)
    }
  }, [id])

  const onFinish = async (values) => {
    try {
      if (id) {
        await updatePatient(id, values)
      } else {
        await addPatient(values)
      }
      message.success('Zapisano pomyślnie')
      navigate('/patients')
    } catch (error) {
      message.error('Wystąpił błąd')
    }
  }

  return (
    <Card title={id ? 'Edytuj Pacjenta' : 'Nowy Pacjent'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Imię i Nazwisko"
          rules={[{ required: true, message: 'Proszę podać imię i nazwisko' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Proszę podać email' },
            { type: 'email', message: 'Nieprawidłowy format email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true, message: 'Proszę podać numer telefonu' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Adres"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? 'Zapisz zmiany' : 'Dodaj pacjenta'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/patients')}>
            Anuluj
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default PatientForm
