import React from 'react';
import { useNavigate } from 'react-router-dom';

function Clinics({ clinic }) {
  const navigate = useNavigate();

  return (
    <div
      className='card'
      onClick={() => navigate(`/book-appointment/${clinic?._id}`)}
    >
      <div className='card-header'>
        <img alt={clinic?.clinicName} src={clinic?.clinicImage} />
      </div>
      <div className='card-body'>
        <h1 className='card-title'>{clinic?.clinicName}</h1>
        <p>
          <b>ที่อยู่: </b>
          {clinic?.clinicAddress}
        </p>
        <p>
          <b>เวลาเปิดบริการ: </b>
          {clinic?.timing[0]} - {clinic?.timing[1]} น.
        </p>
      </div>
    </div>
  );
}

export default Clinics;
