import { nanoid } from '@reduxjs/toolkit';

import { IArticleDescription } from 'models/article';
import heartIcon from 'assets/heart-icon.svg';

import * as classes from './ArticleDescription.module.css';

export default function ArticleDescription(props: IArticleDescription) {
  const { description, descriptionColor, favoritesCount, tagList, children } =
    props;

  const tags = tagList.map((tag) => (
    <li key={nanoid()} className={classes.tag}>
      {tag}
    </li>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.caption}>
        {children}
        <button type="button" className={classes.likesBtn}>
          <img src={heartIcon} alt="heart-icon" />
          <span>{favoritesCount}</span>
        </button>
      </div>

      <ul className={classes.tagList}>{tags}</ul>
      <p className={classes.desc} style={{ color: descriptionColor }}>
        {description}
      </p>
    </div>
  );
}
