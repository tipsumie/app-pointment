import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ClinicForm from '../../components/ClinicForm';
import { useSelector } from 'react-redux';
import moment from 'moment';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [clinic, setClinic] = useState(null);

  const onFinish = async (value) => {
    try {
      const response = await axios.post(
        '/api/clinic/update-clinic-profile',
        {
          ...value,
          userId: user._id,
          timing: [
            moment(value.timing[0]).format('HH:mm'),
            moment(value.timing[1]).format('HH:mm'),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('มีบางอย่างผิดพลาด');
    }
  };

  const getClinic = async () => {
    try {
      const response = await axios.post(
        '/api/clinic/clinic-by-user-id',
        { userId: params.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setClinic(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClinic();

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h2>แก้ไขข้อมูลคลินิก</h2>
      <hr />
      {clinic && <ClinicForm onFinish={onFinish} initialValues={clinic} />}
    </Layout>
  );
}

export default UpdateProfile;
