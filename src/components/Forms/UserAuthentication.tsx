import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import fetchUserAuthentication from 'store/thunks/fetchUserAuthentication';
import { clearErrorMessage } from 'store/slices/userSlice';

import InputBorder from './styles/InputBorder';
import * as classes from './styles/Form.module.css';

type LoginForm = {
  email: string;
  password: string;
};

export default function UserAuthentication() {
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: false,
  });

  const { errors } = formState;

  const { errorMessage, isLogged } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginForm) => {
    dispatch(fetchUserAuthentication(data));
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
    if (isLogged) {
      navigate('/articles');
    }
  }, [dispatch, navigate, isLogged]);

  const { Black, Red } = InputBorder;

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <h2 className={classes.title}>Sign In</h2>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <ul className={classes.list}>
            <li>
              <label htmlFor="sign-in-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="sign-in-email"
                  style={
                    errors.email?.message
                      ? { borderColor: Red }
                      : { borderColor: Black }
                  }
                  placeholder="Email address"
                  autoComplete="off"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^\S+@[a-z]+\.[a-z]+$/,
                      message: 'Wrong email format',
                    },
                  })}
                />
                <strong>{errors.email?.message}</strong>
              </label>
            </li>

            <li>
              <label htmlFor="sign-in-password" className={classes.label}>
                Password
                <input
                  type="password"
                  id="sign-in-password"
                  style={
                    errors.password?.message
                      ? { borderColor: Red }
                      : { borderColor: Black }
                  }
                  placeholder="Password"
                  autoComplete="off"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 1,
                      message: 'Password is required',
                    },
                  })}
                />
              </label>
              <strong>{errors.password?.message}</strong>
            </li>
          </ul>

          {errorMessage !== '' && <strong>{errorMessage}</strong>}
          <button type="submit">Login</button>
        </form>

        <div className={classes.notice}>
          <span>Don&apos;t have an account?</span>
          <Link to="/sign-up" className={classes.link}>
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
