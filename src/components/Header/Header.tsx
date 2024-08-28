import { Link } from 'react-router-dom';

import avatar from 'assets/avatar.png';

import * as classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/articles">Realworld Blog</Link>
      </div>

      <div className={classes.user}>
        <Link to="new-article" className={classes.createBtn}>
          Create article
        </Link>
        <span className={classes.username}>Nikolai Kazancev</span>
        <Link to="user">
          <img src={avatar} alt="avatar" />
        </Link>
      </div>

      <div className={classes.actions}>
        <Link to="sign-in" className={classes.authBtn}>
          sign in
        </Link>
        <Link to="sign-up" className={classes.regBtn}>
          sign up
        </Link>
      </div>
    </header>
  );
}
