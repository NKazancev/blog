import { Link } from 'react-router-dom';

import * as classes from 'styles/forms.module.css';

export default function Registration() {
  return (
    <div className={classes.container} style={{ maxWidth: '384px' }}>
      <div className={classes.body}>
        <h2 className={classes.title}>Create new account</h2>

        <form className={classes.form}>
          <ul className={classes.list}>
            <li>
              <label htmlFor="input-sign-up-username" className={classes.label}>
                Username
                <input
                  type="text"
                  id="input-sign-up-username"
                  className={classes.input}
                  placeholder="Email address"
                />
              </label>
            </li>

            <li>
              <label htmlFor="input-sign-up-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="input-sign-up-email"
                  className={classes.input}
                  placeholder="Email address"
                />
              </label>
            </li>

            <li>
              <label htmlFor="input-sign-up-password" className={classes.label}>
                Password
                <input
                  type="password"
                  id="input-sign-up-password"
                  className={classes.input}
                  placeholder="Password"
                />
              </label>
            </li>

            <li>
              <label htmlFor="input-repeat-password" className={classes.label}>
                Repeat password
                <input
                  type="password"
                  id="input-repeat-password"
                  className={classes.input}
                  placeholder="Password"
                />
              </label>
            </li>
          </ul>

          <label htmlFor="input-sign-up-checkbox" className={classes.checkbox}>
            <input
              type="checkbox"
              id="input-sign-up-checkbox"
              className={classes.checkboxInput}
              placeholder="Password"
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
