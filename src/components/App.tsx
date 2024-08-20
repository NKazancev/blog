import { Link, Outlet } from 'react-router-dom';

import * as classes from './App.module.css';

export default function App() {
  return (
    <div>
      <header className={classes.header}>
        <Link to="/">Realworld Blog</Link>

        <div className={classes.actions}>
          <Link to="sign-in" className={classes.authBtn}>
            sign in
          </Link>
          <Link to="sign-up" className={classes.regBtn}>
            sign up
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
