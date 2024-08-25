import { Link } from 'react-router-dom';

import * as classes from 'styles/forms.module.css';

export default function Authorization() {
  return (
    <div className={classes.container} style={{ maxWidth: '384px' }}>
      <div className={classes.body}>
        <h2 className={classes.title}>Sign in</h2>

        <form className={classes.form}>
          <ul className={classes.list}>
            <li>
              <label htmlFor="input-sign-in-email" className={classes.label}>
                Email address
                <input
                  type="email"
                  id="input-sign-in-email"
                  className={classes.input}
                  placeholder="Email address"
                />
              </label>
            </li>

            <li>
              <label htmlFor="input-sign-in-password" className={classes.label}>
                Password
                <input
                  type="password"
                  id="input-sign-in-password"
                  className={classes.input}
                  placeholder="Password"
                />
              </label>
            </li>
          </ul>

          <button type="submit" className={classes.button}>
            Login
          </button>
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
