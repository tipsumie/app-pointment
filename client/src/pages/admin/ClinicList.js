import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Table, Tabs, Button } from 'antd';
import toast from 'react-hot-toast';
import moment from 'moment';

function ClinicsList() {
  const { TabPane } = Tabs;
  const [clinics, setClinics] = useState([]);

  const getClinics = async () => {
    try {
      const response = await axios.get('/api/admin/get-all-clinics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.data) {
        setClinics(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('การดึงข้อมูลคลินิก มีบางอย่างผิดพลาด');
    }
  };

  const changeClinicStatus = async (record, status) => {
    try {
      const response = await axios.post(
        '/api/admin/change-status-to-clinic',
        { clinicId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.data) {
        getClinics();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('การเปลี่ยนสถานะเป็นคลินิก มีบางอย่างผิดพลาด');
    }
  };

  useEffect(() => {
    getClinics();
  }, []);

  const columns = [
    {
      title: 'ชื่อคลิกนิก',
      dataIndex: 'clinicName',
      key: 'clinicName',
    },
    {
      title: 'เบอร์',
      dataIndex: 'clinicTel',
      key: 'clinicTel',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'clinicAddress',
      key: 'clinicAddress',
    },
    {
      title: 'เข้าร่วมเมื่อ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record, text) => moment(record.createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'สถานะ',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'จัดการ',
      key: 'manage',
      render: (text, record) => (
        <div className='manage-btn'>
          {record.status === 'รอดำเนินการ' && (
            <Button onClick={() => changeClinicStatus(record, 'อนุมัติแล้ว')}>
              อนุมัติ
            </Button>
          )}
          {record.status === 'อนุมัติแล้ว' && (
            <Button
              danger
              onClick={() => changeClinicStatus(record, 'ปิดการเข้าถึง')}
            >
              ปิดการเข้าถึง
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2>การจัดการคลินิก</h2>
      <Tabs>
        <TabPane>
          <Table
            columns={columns}
            dataSource={clinics}
            scroll={{
              x: 700,
            }}
            pagination={{
              pageSize: 5,
            }}
          />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default ClinicsList;
