import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, DatePicker, Row, TimePicker, Input } from 'antd';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import moment from 'moment';

function BookAppointment() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [tel, setTel] = useState();

  const getClinicDetails = async () => {
    try {
      const response = await axios.post(
        '/api/clinic/clinic-by-id',
        {
          clinicId: params.clinicId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setClinicDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkBooking = async () => {
    try {
      const response = await axios.post(
        '/api/user/check-booking',
        {
          clinicId: params.clinicId,
          userId: user._id,
          date: date,
          time: time,
          clinic: clinicDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('มีบางอย่างผิดพลาด');
    }
  };

  const book = async () => {
    setIsAvailable(false);
    try {
      const response = await axios.post(
        '/api/user/book',
        {
          clinicId: params.clinicId,
          userId: user._id,
          clinic: clinicDetails,
          user: user,
          tel: tel,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/appointments');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('การจองนัดผิดพลาด');
    }
  };

  useEffect(() => {
    getClinicDetails();

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {clinicDetails && (
        <div>
          <h2>{clinicDetails.clinicName}</h2>
          <hr />
          <Row justify='center' gutter={20}>
            <Col lg={8}>
              <img
                src={clinicDetails.clinicImage}
                alt={clinicDetails.clinicImage}
                width='100%'
                height='300px'
              />
            </Col>

            <Col lg={8}>
              <div className='book-details'>
                <b>เวลาเปิดบริการ: </b>
                {clinicDetails.timing[0]} - {clinicDetails.timing[1]} น.
              </div>
              <div>
                <b>เบอร์โทร: </b>
                {clinicDetails.clinicTel}
              </div>
              <div>
                <b>ที่อยู่: </b>
                {clinicDetails.clinicAddress}
              </div>
              <div>
                <b>เว็บไซต์: </b>
                {clinicDetails.clinicWeb}
              </div>

              <div className='book-info'>
                <Input
                  placeholder='กรอกเบอร์โทรศัพท์ ex. 091-xxx-xxxx)'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <div>
                <DatePicker
                  format='DD-MM-YY'
                  placeholder='เลือกวันเข้าใช้บริการ'
                  onChange={(value) => {
                    setDate(moment(value).format('DD-MM-YY'));
                    setIsAvailable(false);
                  }}
                  className='book-details'
                />
              </div>
              <div>
                <TimePicker
                  format='HH:mm'
                  placeholder='เลือกเวลาเข้าใช้บริการ'
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format('HH:mm'));
                  }}
                  className='book-details'
                />
              </div>
              <div className='btn-book'>
                {!isAvailable && (
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={checkBooking}
                  >
                    ตรวจสอบนัด
                  </Button>
                )}

                {isAvailable && (
                  <Button type='primary' htmlType='submit' onClick={book}>
                    จองนัด
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
