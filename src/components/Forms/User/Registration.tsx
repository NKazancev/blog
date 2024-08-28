import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import * as classes from '../Form.module.css';

type SignupForm = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  isAgreed: boolean;
};

export default function Registration() {
  const form = useForm<SignupForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      isAgreed: false,
    },
    shouldFocusError: false,
  });

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;

  const password = watch('password');

  const onSubmit = (data: SignupForm) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    return user;
  };

  return (
    <div className={classes.container} style={{ maxWidth: '384px' }}>
      <div className={classes.body}>
        <h2 className={classes.title}>Create new account</h2>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <ul className={classes.list}>
            <li>
              <label htmlFor="sign-up-username" className={classes.label}>
                Username
                <input
                  type="text"
                  id="sign-up-username"
                  className={
                    errors.username?.message
                      ? classes.input + ' error-input'
                      : classes.input
                  }
                  placeholder="Username"
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'Username is required',
                    },
                    minLength: {
                      value: 3,
                      message: 'Username needs to be at least 3 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: "Username shouldn't be more than 20 characters",
                    },
                  })}
                />
                <strong className={classes.warning}>
                  {errors.username?.message}
                </strong>
              </label>
            </li>

            <li>
              <label htmlFor="sign-up-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="sign-up-email"
                  className={
                    errors.email?.message
                      ? classes.input + ' error-input'
                      : classes.input
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
                <strong className={classes.warning}>
                  {errors.email?.message}
                </strong>
              </label>
            </li>

            <li>
              <label htmlFor="sign-up-password" className={classes.label}>
                Password
                <input
                  type="password"
                  id="sign-up-password"
                  className={
                    errors.password?.message
                      ? classes.input + ' error-input'
                      : classes.input
                  }
                  placeholder="Password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 6,
                      message: 'Password needs to be at least 6 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: "Password shouldn't be more than 40 characters",
                    },
                  })}
                />
                <strong className={classes.warning}>
                  {errors.password?.message}
                </strong>
              </label>
            </li>

            <li>
              <label
                htmlFor="sign-up-repeat-password"
                className={classes.label}
              >
                Repeat password
                <input
                  type="password"
                  id="sign-up-repeat-password"
                  className={
                    errors.repeatPassword?.message
                      ? classes.input + ' error-input'
                      : classes.input
                  }
                  placeholder="Password"
                  {...register('repeatPassword', {
                    required: {
                      value: true,
                      message: 'Password confirmation is required',
                    },
                    validate: (formField) => {
                      if (password !== formField) {
                        return 'Passwords must match';
                      }
                    },
                  })}
                />
                <strong className={classes.warning}>
                  {errors.repeatPassword?.message}
                </strong>
              </label>
            </li>
          </ul>

          <label htmlFor="sign-up-checkbox" className={classes.checkboxLabel}>
            <input
              type="checkbox"
              id="sign-up-checkbox"
              className={classes.checkboxInput}
              {...register('isAgreed', {
                validate: (formField) => {
                  if (formField !== true) {
                    return 'Agreement is required';
                  }
                },
              })}
            />
            I agree to the processing of my personal information
          </label>

          <button type="submit" className={classes.button}>
            Login
          </button>
        </form>

        <div className={classes.notice}>
          <span>Already have an account?</span>
          <Link to="/sign-in" className={classes.link}>
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
