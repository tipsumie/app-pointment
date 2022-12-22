import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Table, Tabs } from 'antd';
import toast from 'react-hot-toast';
import moment from 'moment';

function UsersList() {
  const { TabPane } = Tabs;
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/admin/get-all-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.data) {
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error('การดึงข้อมูลผู้ใช้ มีบางอย่างผิดพลาด');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'เข้าร่วมเมื่อ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record, text) => moment(record.createdAt).format('DD/MM/YYYY'),
    },
  ];

  return (
    <Layout>
      <h2>การจัดการผู้ใช้</h2>
      <Tabs>
        <TabPane>
          <Table
            columns={columns}
            dataSource={users}
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

export default UsersList;
