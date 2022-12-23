import React from 'react';
import { Button, Col, Form, Input, Row, TimePicker, Upload } from 'antd';
import moment from 'moment';

function ClinicForm({ onFinish, initialValues }) {
  const [form] = Form.useForm();

  return (
    <Form
      layout='vertical'
      form={form}
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          timing: [
            moment(initialValues?.timing[0], 'HH:mm'),
            moment(initialValues?.timing[1], 'HH:mm'),
          ],
        }),
        clinicImage: initialValues?.clinicImage.file,
      }}
    >
      <h4 className='content-title'>ข้อมูลคลินิก</h4>
      <Row justify={'center'}>
        <Col sm={18} md={12} lg={10}>
          <Form.Item
            label='ชื่อคลินิก'
            name='clinicName'
            rules={[{ required: true, message: 'กรุณากรอกชื่อคลินิก' }]}
            hasFeedback
          >
            <Input placeholder='กรอกชื่อคลินิก' />
          </Form.Item>
          <Form.Item
            label='โทรศัพท์ติดต่อ  (ex.091-xxx-xxxx)'
            name='clinicTel'
            rules={[
              { required: true, message: 'กรุณากรอกเบอร์' },
              {
                message: 'กรุณากรอกเบอร์ที่ถูกต้อง',
              },
              { pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', message: 'กรุณากรอกเบอร์ให้ถูกต้อง' },
            ]}
            hasFeedback
          >
            <Input placeholder='กรอกเบอร์โทรศัพท์' />
          </Form.Item>
          <Form.Item
            label='ที่อยู่คลินิก'
            name='clinicAddress'
            rules={[{ required: true, message: 'กรุณากรอกที่อยู่คลินิก' }]}
            hasFeedback
          >
            <Input.TextArea
              placeholder='กรอกที่อยู่คลินิก'
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label='เว็บไซต์คลินิก'
            name='clinicWeb'
            rules={[{ type: 'url', message: 'กรอกเว็บไซต์' }]}
            hasFeedback
          >
            <Input placeholder='กรอกเว็บไซต์' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='ช่วงเวลาเปิดบริการ'
            name='timing'
            rules={[{ required: true, message: 'กรุณาเลือกช่วงเวลา' }]}
            hasFeedback
          >
            <TimePicker.RangePicker
              format='HH:mm'
              style={{ width: '100%' }}
              placeholder={['ช่วงเวลาเปิด', 'ช่วงเวลาปิด']}
            />
          </Form.Item>
          <Form.Item label='รูปภาพคลินิก' name='clinicImage'>
            <Upload type='file' maxCount={1} beforeUpload={() => false}>
              <Button>อัพโหลดรูปภาพ</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='add-btn'>
              เพิ่มคลินิก
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ClinicForm;
