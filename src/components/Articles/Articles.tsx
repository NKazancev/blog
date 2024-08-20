import { useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchArticles } from 'store/slices/articlesSlice';
import { IArticle } from 'models/article';

import Pagination from './Pagination/Pagination';
import Article from './Article/Article';
import * as classes from './Articles.module.css';

export default function Articles() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.articlesSlice);

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);

  const articlesList = articles.map((article: IArticle) => {
    return (
      <Article
        key={nanoid()}
        title={article.title}
        tagList={article.tagList}
        description={article.description}
        author={article.author}
        favoritesCount={article.favoritesCount}
      />
    );
  });

  return (
    <div className={classes.articles}>
      <ul className={classes.list}>{articlesList}</ul>
      <Pagination />
    </div>
  );
}
