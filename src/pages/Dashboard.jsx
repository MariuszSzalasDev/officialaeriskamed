import { Row, Col, Card, Statistic } from 'antd'
import { UserOutlined, MedicineBoxOutlined, ShopOutlined } from '@ant-design/icons'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../components/common/PageHeader'

const Dashboard = () => {
  const data = [
    { name: 'Sty', visits: 400 },
    { name: 'Lut', visits: 300 },
    { name: 'Mar', visits: 600 },
  ]

  return (
    <>
      <PageHeader title="Dashboard" />
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Aktywni Pacjenci"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Wizyty w tym miesiącu"
              value={93}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Aktywne sklepy"
              value={3}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: 16 }}>
        <h3>Wizyty w czasie</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}

export default Dashboard
