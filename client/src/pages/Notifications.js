import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Tabs, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  const deleteNotification = async () => {
    try {
      const response = await axios.post(
        '/api/user/delete-notification',
        { user: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('มีบางอย่างผิดพลาด การลบการแจ้งเตือน');
    }
  };

  useEffect(() => {
    localStorage.setItem('noti', user?.notification.length);
  }, [user?.notification.length]);

  const gridStyle = {
    card: {
      width: '100%',
      height: '25%',
      textAlign: 'start',
    },
  };

  return (
    <Layout>
      <h1>การแจ้งเตือน</h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab={<span>ข้อความทั้งหมด</span>} key='1'>
          <div className='delete-meessage'>
            <h6 className='anchor pe-auto' onClick={() => deleteNotification()}>
              ลบข้อความ
            </h6>
          </div>
          {user?.notification.map((notification) => (
            <Card.Grid
              onClick={() => navigate(notification.onClickPath)}
              style={gridStyle.card}
            >
              {notification.message}
            </Card.Grid>
          ))}
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
