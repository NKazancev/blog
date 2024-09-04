import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';

import { IArticleDescription } from 'models/article';
import heartIcon from 'assets/heart-icon.svg';
import heartIconFill from 'assets/heart-icon-fill.svg';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import fetchArticleLike from 'store/thunks/fetchArticleLike';
import fetchArticleDislike from 'store/thunks/fetchArticleDislike';

import * as classes from './ArticleDescription.module.css';

export default function ArticleDescription(props: IArticleDescription) {
  const {
    slug,
    description,
    descriptionColor,
    favorited,
    favoritesCount,
    tagList,
    children,
  } = props;

  const { token } = JSON.parse(localStorage.getItem('user') || '{}');
  const { isLogged } = useAppSelector((state) => state.userSlice);

  const [isFavorited, setIsFavorited] = useState(favorited);
  const [likesNumber, setLikesNumber] = useState(favoritesCount);
  const dispatch = useAppDispatch();

  const likeArticle = () => {
    if (isLogged) {
      if (!isFavorited) {
        dispatch(fetchArticleLike({ token, slug }));
        setLikesNumber(likesNumber + 1);
        setIsFavorited(true);
      } else {
        dispatch(fetchArticleDislike({ token, slug }));
        setLikesNumber(likesNumber - 1);
        setIsFavorited(false);
      }
    }
  };

  const tags = tagList.map((tag) => (
    <li key={nanoid()} className={classes.tag}>
      {tag}
    </li>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.caption}>
        {children}

        <button
          type="button"
          onClick={likeArticle}
          className={classes.likesBtn}
          style={{ cursor: token ? 'pointer' : 'auto' }}
        >
          {!isFavorited && <img src={heartIcon} alt="heart-icon" />}
          {isFavorited && <img src={heartIconFill} alt="heart-icon" />}
          <span>{likesNumber}</span>
        </button>
      </div>

      <ul className={classes.tagList}>{tags}</ul>

      <p className={classes.desc} style={{ color: descriptionColor }}>
        {description}
      </p>
    </div>
  );
}
