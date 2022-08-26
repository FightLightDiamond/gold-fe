import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { signIn } from "../../app/http/store/reducers/auth.slice";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (auth.isAuthentication) {
      navigate('/')
    }
  }, [auth])

  return <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
    <div className={'container'}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={
            (e) => setEmail(e.target.value)
          } type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={
            (e) => setPassword(e.target.value)
          } type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => dispatch(signIn({
          email, password
        }))}>
          Submit
        </Button>
      </Form>
    </div>

  </ThemeProvider>
}

export default Login
