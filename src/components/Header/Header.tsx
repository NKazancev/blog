import { Link } from 'react-router-dom';

import avatar from 'assets/avatar.png';

import * as classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/articles">Realworld Blog</Link>
      </div>

      <div className={classes.userPanel}>
        <Link to="new-article" className={classes.createBtn}>
          Create article
        </Link>
        <span className={classes.username}>Nikolai Kazancev</span>
        <Link to="user">
          <img src={avatar} alt="avatar" />
        </Link>
        <button type="button" className={classes.logoutBtn}>
          Log Out
        </button>
      </div>

      <div className={classes.actionsPanel}>
        <Link to="sign-in">Sign In</Link>
        <Link to="sign-up" className={classes.regBtn}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}
