import { useState } from 'react';
import { Link } from 'react-router-dom';

import ArticlePopup from '../ArticlePopup/ArticlePopup';

import * as classes from './ArticleButtons.module.css';

export default function ArticleButtons({ slug = '' }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div className={classes.buttons}>
      <button
        type="button"
        onClick={() => setIsPopupVisible(true)}
        className={classes.button}
      >
        Delete
      </button>
      {isPopupVisible && (
        <ArticlePopup slug={slug} onClose={() => setIsPopupVisible(false)} />
      )}
      <Link to="edit" className={classes.link}>
        Edit
      </Link>
    </div>
  );
}
