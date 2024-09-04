import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import fetchUserUpdate from 'store/thunks/fetchUserUpdate';
import { clearErrorMessage } from 'store/slices/userSlice';

import InputBorder from './styles/InputBorder';
import * as classes from './styles/Form.module.css';

type EditProfileForm = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export default function UserUpdate() {
  const { token, username, email, image } = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const { register, handleSubmit, setError, formState } =
    useForm<EditProfileForm>({
      defaultValues: {
        username: username || '',
        email: email || '',
        password: '',
        avatar: image || '',
      },
      shouldFocusError: false,
    });

  const { errors } = formState;

  const { errorMessage, isUpdated } = useAppSelector(
    (state) => state.userSlice
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: EditProfileForm) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
      image: data.avatar,
    };
    dispatch(fetchUserUpdate({ token, userData: user }));
  };

  useEffect(() => {
    if (errorMessage === 'Such username already exists') {
      setError('username', { message: errorMessage });
    }
    if (errorMessage === 'Such email already exists') {
      setError('email', { message: errorMessage });
    }
    if (errorMessage === 'Such username and email already exist') {
      setError('username', { message: 'Such username already exists' });
      setError('email', { message: 'Such email already exists' });
    }
    if (errorMessage === 'Only letters and digits are allowed') {
      setError('username', { message: errorMessage });
    }
  }, [setError, errorMessage]);

  useEffect(() => {
    dispatch(clearErrorMessage());
    if (isUpdated) {
      navigate('/articles');
    }
  }, [navigate, dispatch, isUpdated]);

  const { Black, Red } = InputBorder;

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <h2 className={classes.title}>Edit Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <ul className={classes.list}>
            <li>
              <label htmlFor="edit-profile-username" className={classes.label}>
                Username
                <input
                  type="text"
                  id="edit-profile-username"
                  style={
                    errors.username?.message
                      ? { borderColor: Red }
                      : { borderColor: Black }
                  }
                  placeholder="Username"
                  autoComplete="off"
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
                    validate: (formField) => {
                      if (formField.includes(' ')) {
                        return 'Spaces are not allowed';
                      }
                    },
                  })}
                />
              </label>
              <strong>{errors.username?.message}</strong>
            </li>

            <li>
              <label htmlFor="edit-profile-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="edit-profile-email"
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
              </label>
              <strong>{errors.email?.message}</strong>
            </li>

            <li>
              <label htmlFor="edit-profile-password" className={classes.label}>
                New password
                <input
                  type="password"
                  id="edit-profile-password"
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
                      value: 6,
                      message: 'Password needs to be at least 6 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: "Password shouldn't be more than 40 characters",
                    },
                    validate: (formField) => {
                      if (formField.includes(' ')) {
                        return 'Spaces are not allowed';
                      }
                    },
                  })}
                />
              </label>
              <strong>{errors.password?.message}</strong>
            </li>

            <li>
              <label htmlFor="edit-profile-avatar" className={classes.label}>
                Avatar image (url)
                <input
                  type="text"
                  id="edit-profile-avatar"
                  style={
                    errors.avatar?.message
                      ? { borderColor: Red }
                      : { borderColor: Black }
                  }
                  placeholder="Avatar image"
                  autoComplete="off"
                  {...register('avatar', {
                    required: false,
                    pattern: {
                      value: /^(https?|ftp):\/\/\S+\.\S+$/,
                      message: 'URL is incorrect',
                    },
                  })}
                />
              </label>
              {errorMessage === 'Entered data is incorrect' && (
                <strong>{errorMessage}</strong>
              )}
              <strong>{errors.avatar?.message}</strong>
            </li>
          </ul>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
