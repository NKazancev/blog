import { nanoid } from '@reduxjs/toolkit';

import { IArticle } from 'models/article';
import heartIcon from 'assets/heart-icon.svg';

import * as classes from './Article.module.css';

export default function Article(props: IArticle) {
  const { title, tagList, description, author, favoritesCount } = props;

  const tags = tagList.map((tag) => (
    <li key={nanoid()} className={classes.tag}>
      {tag}
    </li>
  ));

  return (
    <li className={classes.article}>
      <div>
        <div className={classes.caption}>
          <h3 className={classes.title}>{title}</h3>

          <button type="button" className={classes.likesBtn}>
            <img src={heartIcon} alt="heart-icon" />
            <span>{favoritesCount}</span>
          </button>
        </div>

        <ul className={classes.tagList}>{tags}</ul>

        <p className={classes.desc}>{description}</p>
      </div>

      <div className={classes.user}>
        <span>{author.username}</span>
        <div className={classes.avatar}>
          <img src={author.image} alt="avatar" />
        </div>
      </div>
    </li>
  );
}
