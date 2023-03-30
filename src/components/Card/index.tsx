import React from "react";
// import {
//   MDBCard,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol, MDBIcon
// } from 'mdb-react-ui-kit';
import {MDBBadge, MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';
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
      /**
       * TODO: https://mdbootstrap.com/docs/react/components/list-group/
       */
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
              {/*<MDBIcon fab icon='google' size='lg' />*/}
            {/*<MDBIcon fas icon="eraser" />*/}
            <MDBIcon fas icon="backspace" size='lg' />
          </MDBBtn>
      </MDBListGroupItem>
      // <MDBCard>
      //   <MDBRow className='g-0'>
      //     <MDBCol md='4'>
      //       <MDBCardImage src='http://localhost:3000/img/without/7.png' alt='...' fluid />
      //     </MDBCol>
      //     <MDBCol md='8'>
      //       <MDBCardBody>
      //         <MDBCardTitle>Card title</MDBCardTitle>
      //         {/*<MDBCardText>*/}
      //         {/*  This is a wider card with supporting text below as a natural lead-in to additional content. This*/}
      //         {/*  content is a little bit longer.*/}
      //         {/*</MDBCardText>*/}
      //         <MDBCardText>
      //           <small className='text-muted'>*****</small>
      //           <section className="p-4 d-flex justify-content-center">
      //             <MDBIcon fas icon="star" />
      //             <MDBIcon fas icon="star" />
      //             <MDBIcon fas icon="star" />
      //             <MDBIcon fas icon="star" />
      //             <MDBIcon fas icon="star" />
      //           </section>
      //         </MDBCardText>
      //       </MDBCardBody>
      //     </MDBCol>
      //   </MDBRow>
      // </MDBCard>
  );
};

export default Card;
