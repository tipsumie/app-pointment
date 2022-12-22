import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
import toast from 'react-hot-toast';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const resposne = await axios.get('/api/user/appointments-by-user-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      toast.error('มีบางอย่างผิดพลาด');
    }
  };
  const columns = [
    {
      title: 'คลินิก',
      dataIndex: 'clinicName',
      key: 'clinicName',
      render: (text, record) => <span>{record.clinic.clinicName}</span>,
    },
    {
      title: 'เบอร์ติดต่อ',
      dataIndex: 'clinicTel',
      key: 'clinicTel',
      render: (text, record) => <span>{record.clinic.clinicTel}</span>,
    },
    {
      title: 'วันที่นัด',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <span>{moment(record.date).format('DD/MM/YYYY')} </span>
      ),
    },
    {
      title: 'เวลานัด',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => (
        <span>{moment(record.time).format('HH:mm')} น.</span>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'clinicName',
    },
  ];
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <h2>การนัดหมาย</h2>
      <hr />
      <Table
        columns={columns}
        dataSource={appointments}
        scroll={{
          x: 700,
        }}
        pagination={{
          pageSize: 5,
        }}
      />
    </Layout>
  );
}

export default Appointments;
