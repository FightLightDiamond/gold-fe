import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { signUp } from "../../app/http/store/reducers/auth.slice";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import styles from '../../styles/login.module.scss'

type TInputs = {
  email: string,
  password: string,
  confirmation_password: string,
  navigate: NavigateFunction,
};

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  // const [confirmation_password, setConfirmationPassword] = useState<string>('')
  const auth = useSelector((state: any) => state.auth);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<TInputs>();
  const onSubmit: SubmitHandler<TInputs> = data => {
    data.navigate = navigate
    dispatch({
      type: signUp.type,
      payload: data
    })
  }

  useEffect(() => {
    if (auth.isAuthentication) {
      navigate('/')
    }

    if(auth.signUpped) {
      navigate('/login')
    }
  }, [auth.signUpped, auth.isAuthentication])

  return <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
    <div className={styles.body}>
      <div className={styles.boxRegister}>
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className="text-light">Sign up</h2>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control {...register("email", { required: true })} type="email" placeholder="Enter email" />
            {errors.email && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control {...register("password", { required: true })} type="password" placeholder="Password" />
            {errors.password && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Confirmation Password</Form.Label>
            <Form.Control {...register("confirmation_password", { required: true })} type="password" placeholder="Confirmation Password" />
            {errors.confirmation_password && <span>This field is required</span>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </ThemeProvider>
}

export default Register
