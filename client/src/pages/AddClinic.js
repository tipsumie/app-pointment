import React from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClinicForm from '../components/ClinicForm';
import moment from 'moment';

function AddClinic() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await axios.post(
        '/api/user/add-clinic-account',
        {
          ...value,
          userId: user._id,
          timing: [
            moment(value.timing[0]).format('HH:mm'),
            moment(value.timing[1]).format('HH:mm'),
          ],
          clinicImage: value.clinicImage.file,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
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

  return (
    <Layout>
      <h2>เพิ่มคลินิก</h2>
      <hr />
      <ClinicForm onFinish={onFinish} />
    </Layout>
  );
}

export default AddClinic;
