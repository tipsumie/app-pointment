import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../images/heart-logo.png';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await axios.post('/api/user/login', value);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.data);
        navigate('/');
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
        <h3 className='title'>นัดนัด</h3>
        <Form className='form' layout='vertical' onFinish={onFinish}>
          <Form.Item
            label={<label style={{ color: 'white' }}>Email</label>}
            name='email'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกอีเมล',
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
                message: 'กรุณากรอกรหัสผ่าน',
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
          <p style={{ color: 'white' }}>
            ต้องการสร้างบัญชีหรือไม่?{'  '}
            <Link to='/register' className='accout'>
              สร้างบัญชี
            </Link>
          </p>
          <Form.Item className='btn-login'>
            <Button type='primary' htmlType='submit'>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
