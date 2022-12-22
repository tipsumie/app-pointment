import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../images/heart-logo.png';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await axios.post('/api/user/register', value);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('มีบางอย่างผิดพลาด');
    }
  };

  return (
    <div className='auth'>
      <div className='auth-form'>
        <img className='img-login' src={logo} alt='logo' />
        <h4 className='title'>สร้างบัญชีนัดหมาย</h4>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            label={<label style={{ color: 'white' }}>ชื่อผู้ใช้</label>}
            name='name'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อผู้ใช้!',
              },
              { min: 2, message: 'ป้อนอักขระอย่างน้อย 2 ตัว' },
            ]}
            hasFeedback
          >
            <Input placeholder='กรอกชื่อผู้ใช้' />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: 'white' }}>Email</label>}
            name='email'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกอีเมล!',
              },
              { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
            ]}
            hasFeedback
          >
            <Input placeholder='กรอกอีเมล' />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: 'white' }}>รหัสผ่าน</label>}
            name='password'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรหัสผ่าน!',
              },
              {
                min: 6,
                max: 12,
                message: 'กรอกรหัสผ่านอย่างน้อย 6-12 ตัว',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder='กรอกรหัสผ่าน' />
          </Form.Item>

          <Form.Item >
          <Button type='primary' onClick={()=> navigate('/login')} style={{margin: '0 70px 0 0'}}>
              ย้อนกลับ
            </Button>
            <Button type='primary' htmlType='submit'>
              สมัคร
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
