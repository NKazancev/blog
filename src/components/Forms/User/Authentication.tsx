import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import * as classes from '../Form.module.css';
import InputBorder from '../InputBorder';

type LoginForm = {
  email: string;
  password: string;
};

export default function Authentication() {
  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: false,
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { Black, Red } = InputBorder;

  const onSubmit = (data: LoginForm) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    return user;
  };

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
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^\S+@[a-z]+\.[a-z]+$/,
                      message: 'Email is incorrect',
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
