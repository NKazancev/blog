import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import mark from 'assets/exclamation.png';
import IConfirmationModal from 'models/modal';
import fetchArticleDeletion from 'store/thunks/fetchArticleDeletion';

import * as classes from './Confirmation.module.css';

export default function Confirmation(props: IConfirmationModal) {
  const { token } = JSON.parse(localStorage.getItem('user') || '{}');
  const { slug, onClose } = props;
  const { isDeleted } = useAppSelector((state) => state.articlesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDelete = () => {
    dispatch(fetchArticleDeletion({ token, slug }));
  };

  useEffect(() => {
    if (isDeleted) navigate('/articles');
  }, [navigate, isDeleted]);

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <img src={mark} alt="mark" />
        <span className={classes.text}>
          Are you sure to delete this article?
        </span>
      </div>

      <div className={classes.buttons}>
        <button type="button" onClick={onClose} className={classes.btnNo}>
          No
        </button>
        <button type="button" onClick={onDelete} className={classes.btnYes}>
          Yes
        </button>
      </div>
    </div>
  );
}
