import { Table, Button, Space } from 'antd'
import { useState } from 'react'
import { usePatientsStore } from '../../stores/patientsStore'
import PageHeader from '../../components/common/PageHeader'
import PatientForm from '../../components/forms/PatientForm'

const PatientsList = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const { patients, addPatient, updatePatient, deletePatient, loading } = usePatientsStore()

  const columns = [
    {
      title: 'Imię i Nazwisko',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
    },
    {
      title: 'Akcje',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edytuj
          </Button>
          <Button type="link" danger onClick={() => deletePatient(record.id)}>
            Usuń
          </Button>
        </Space>
      ),
    },
  ]

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setFormVisible(true)
  }

  const handleSave = async (values) => {
    if (editingPatient) {
      await updatePatient(editingPatient.id, values)
    } else {
      await addPatient(values)
    }
    setFormVisible(false)
    setEditingPatient(null)
  }

  return (
    <>
      <PageHeader 
        title="Pacjenci" 
        onAdd={() => setFormVisible(true)}
        addButtonText="Dodaj pacjenta"
      />

      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: '8px'
      }}>
        <Table
          columns={columns}
          dataSource={patients}
          rowKey="id"
          loading={loading}
        />
      </div>

      <PatientForm
        open={formVisible}
        onCancel={() => {
          setFormVisible(false)
          setEditingPatient(null)
        }}
        onSave={handleSave}
        initialValues={editingPatient}
        title={editingPatient ? 'Edytuj pacjenta' : 'Dodaj pacjenta'}
      />
    </>
  )
}

export default PatientsList
