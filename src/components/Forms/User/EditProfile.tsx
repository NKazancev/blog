import { useForm } from 'react-hook-form';

import * as classes from '../Form.module.css';

type EditProfileForm = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export default function EditProfile() {
  const form = useForm<EditProfileForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
    shouldFocusError: false,
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: EditProfileForm) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    };
    return user;
  };

  return (
    <div className={classes.container} style={{ maxWidth: '384px' }}>
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
              </label>
              <strong className={classes.warning}>
                {errors.username?.message}
              </strong>
            </li>

            <li>
              <label htmlFor="edit-profile-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="edit-profile-email"
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
              </label>
              <strong className={classes.warning}>
                {errors.email?.message}
              </strong>
            </li>

            <li>
              <label htmlFor="edit-profile-password" className={classes.label}>
                New password
                <input
                  type="password"
                  id="edit-profile-password"
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
              </label>
              <strong className={classes.warning}>
                {errors.password?.message}
              </strong>
            </li>

            <li>
              <label htmlFor="edit-profile-avatar" className={classes.label}>
                Avatar image (url)
                <input
                  type="text"
                  id="edit-profile-avatar"
                  className={
                    errors.avatar?.message
                      ? classes.input + ' error-input'
                      : classes.input
                  }
                  placeholder="Avatar image"
                  {...register('avatar', {
                    pattern: {
                      value: /^\S+\.[a-z]+$/,
                      message: 'Url is incorrect',
                    },
                  })}
                />
              </label>
              <strong className={classes.warning}>
                {errors.avatar?.message}
              </strong>
            </li>
          </ul>

          <button type="submit" className={classes.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
