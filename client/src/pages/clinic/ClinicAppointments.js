import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, Button } from 'antd';
import moment from 'moment';
import toast from 'react-hot-toast';

function ClinicAppointments() {
  const [appointments, setAppointments] = useState([]);

  const getClinicAppointments = async () => {
    try {
      const resposne = await axios.get(
        '/api/clinic/appointments-by-clinic-id',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      toast.error('การดึงข้อมูลนัดหมายคลินิกผิดพลาด มีบางอย่างผิดพลาด');
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      const resposne = await axios.post(
        '/api/clinic/change-appointment-status',
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getClinicAppointments();
      }
    } catch (error) {
      toast.error('การเปลี่ยนสถานะนัดหมายมีบางอย่างผิดพลาด');
    }
  };

  const columns = [
    {
      title: 'ผู้ป่วย',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <span>{record.user.name}</span>,
    },
    {
      title: 'เบอร์ติดต่อ',
      dataIndex: 'tel',
      key: 'tel',
      render: (text, record) => <span>{record.tel}</span>,
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
    {
      title: 'จัดการนัด',
      dataIndex: 'actions',
      key: 'manage',
      render: (text, record) => (
        <div className='manage-btn'>
          {record.status === 'รอดำเนินการ' && (
            <div>
              <Button
                onClick={() => changeAppointmentStatus(record, 'อนุมัติแล้ว')}
              >
                อนุมัติ
              </Button>
              <div className='space'></div>
              <Button
                danger
                onClick={() => changeAppointmentStatus(record, 'ยกเลิกแล้ว')}
              >
                ยกเลิก
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getClinicAppointments();
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

export default ClinicAppointments;
