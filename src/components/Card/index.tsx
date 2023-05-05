import React from "react";
import {MDBBtn, MDBIcon, MDBListGroupItem} from 'mdb-react-ui-kit';
type Props = {
  children?: React.ReactNode;
  data: {
    id: number;
    uuid: string;
    title: string;
    subtitle: string;
    updatedAt: string;
  };
};

const Card = ({ data }: Props) => {
  return (
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <img
              src='https://mdbootstrap.com/img/new/avatars/8.jpg'
              alt=''
              style={{ width: '45px', height: '45px' }}
              className='rounded-circle'
          />
          <div className='ms-3'>
            <p className='fw-bold mb-1'>John Doe</p>
            <p className='text-muted mb-0'>john.doe@gmail.com</p>
          </div>
        </div>
          <MDBBtn color='none'  className='m-1' style={{ color: '#dd4b39' }} href='#'>
            <MDBIcon fas icon="backspace" size='lg' />
          </MDBBtn>
      </MDBListGroupItem>
  );
};

export default Card;
