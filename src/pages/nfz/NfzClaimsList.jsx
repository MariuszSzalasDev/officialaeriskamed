import { Table, Button, Space } from 'antd'
import { useState } from 'react'
import { useNfzClaimsStore } from '../../stores/nfzClaimsStore'
import { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import NfzClaimForm from '../../components/forms/NfzClaimForm'

const NfzClaimsList = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [editingClaim, setEditingClaim] = useState(null)
  const { claims, fetchClaims, addClaim, updateClaim, loading } = useNfzClaimsStore()

  useEffect(() => {
    fetchClaims()
  }, [])

  const columns = [
    {
      title: 'Kod wniosku',
      dataIndex: 'claimCode',
    },
    {
      title: 'Ilość początkowa',
      dataIndex: 'initialQuantity',
    },
    {
      title: 'Ilość dostępna',
      dataIndex: 'availableQuantity',
    },
    {
      title: 'Informacje',
      dataIndex: 'info',
    },
    {
      title: 'Akcje',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edytuj
          </Button>
        </Space>
      ),
    },
  ]

  const handleEdit = (claim) => {
    setEditingClaim(claim)
    setFormVisible(true)
  }

  const handleSave = async (values) => {
    if (editingClaim) {
      await updateClaim(editingClaim.id, values)
    } else {
      await addClaim(values)
    }
    setFormVisible(false)
    setEditingClaim(null)
  }

  return (
    <>
      <PageHeader 
        title="Wnioski NFZ" 
        onAdd={() => setFormVisible(true)}
        addButtonText="Dodaj wniosek"
      />
      
      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: '8px'
      }}>
        <Table
          columns={columns}
          dataSource={claims}
          rowKey="id"
          loading={loading}
        />
      </div>

      <NfzClaimForm
        open={formVisible}
        onCancel={() => {
          setFormVisible(false)
          setEditingClaim(null)
        }}
        onSave={handleSave}
        initialValues={editingClaim}
        title={editingClaim ? 'Edytuj wniosek NFZ' : 'Dodaj wniosek NFZ'}
      />
    </>
  )
}

export default NfzClaimsList
