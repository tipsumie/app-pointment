import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Clinics from '../components/Clinics';
import { Col, Row } from 'antd';

function Home() {
  const [clinics, setClinics] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get('/api/user/all-approved-clinics', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response.data.data) {
        setClinics(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h2>นัดนัดคลินิกออนไลน์</h2>
      <Row className='clinic-list'>
        {clinics.map((clinic) => (
          <Col key={clinic._id} xs={24} sm={13} md={13}>
            <Clinics clinic={clinic} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
