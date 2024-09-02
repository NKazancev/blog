import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeUser } from 'store/slices/userSlice';
import fetchCurrentUser from 'store/thunks/fetchCurrentUser';
import avatar from 'assets/avatar.png';

import * as classes from './Header.module.css';

export default function Header() {
  const { token, username } = JSON.parse(localStorage.getItem('user') || '{}');
  const { isLogged } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) dispatch(fetchCurrentUser(token));
  }, [dispatch, token]);

  const onLogout = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Realworld Blog</Link>
      </div>

      {isLogged && (
        <div className={classes.userPanel}>
          <Link to="new-article" className={classes.createBtn}>
            Create article
          </Link>
          <span className={classes.username}>{username}</span>
          <Link to="user">
            <img src={avatar} alt="avatar" />
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className={classes.logoutBtn}
          >
            Log Out
          </button>
        </div>
      )}

      {!isLogged && (
        <div className={classes.actionsPanel}>
          <Link to="sign-in">Sign In</Link>
          <Link to="sign-up" className={classes.regBtn}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
