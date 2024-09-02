import { useState } from 'react';
import { Link } from 'react-router-dom';

import Confirmation from '../ArticlePopup/ArticlePopup';

import * as classes from './ArticleButtons.module.css';

export default function ArticleButtons({ slug = '' }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={classes.buttons}>
      <button
        type="button"
        onClick={() => setIsModalVisible(true)}
        className={classes.button}
      >
        Delete
      </button>
      {isModalVisible && (
        <Confirmation slug={slug} onClose={() => setIsModalVisible(false)} />
      )}
      <Link to="edit" className={classes.link}>
        Edit
      </Link>
    </div>
  );
}
