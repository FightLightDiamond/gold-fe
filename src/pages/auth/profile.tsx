import ThemeProvider from 'react-bootstrap/ThemeProvider'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {MDBBtn, MDBIcon, MDBInput} from "mdb-react-ui-kit";

const Profile = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [hp, setHp] = useState<number>(0)
  const [atk, setAtk] = useState<number>(0)
  const [def, setDef] = useState<number>(0)
  const [spd, setSpd] = useState<number>(0)

  useEffect(() => {
    if (!auth.isAuthentication) {
      navigate('/login')
    }
  }, [auth])

  return <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
    <>
      <h1 className="text-light">
        Hero of you
      </h1>
      <MDBInput type="number" onChange={(e) => setHp(Number(e.target.value))}
                contrast value={hp} wrapperClass='mb-4' label='HP' />
      <MDBInput type="number" onChange={(e) => setAtk(Number(e.target.value))}
                contrast value={atk} wrapperClass='mb-4' label='ATK' />
      <MDBInput type="number" onChange={(e) => setDef(Number(e.target.value))}
                contrast value={def} wrapperClass='mb-4' label='DEF' />
      <MDBInput type="number" onChange={(e) => setSpd(Number(e.target.value))}
                contrast value={spd} wrapperClass='mb-4' label='SPD' />
      <div className="d-grid gap-2">
        <MDBBtn color='primary'><MDBIcon fas icon="plus" /> Up point</MDBBtn>
      </div>
    </>
  </ThemeProvider>
}

export default Profile
