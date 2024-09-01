import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { IArticle } from 'models/article';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeArticles, resetStatus } from 'store/slices/articlesSlice';
import fetchArticles from 'store/thunks/fetchArticles';
import fetchArticlesAuth from 'store/thunks/fetchArticlesAuth';

import Article from './Article/Article';
import Pagination from './Pagination/Pagination';
import * as classes from './Articles.module.css';

export default function Articles() {
  const { token } = JSON.parse(localStorage.getItem('user') || '{}');
  const { page } = useParams();
  const { articles } = useAppSelector((state) => state.articlesSlice);
  const { errorMessage } = useAppSelector((state) => state.articlesSlice);

  const currentPage = Number(page ?? 1);
  const offset = 5 * (currentPage - 1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeArticles());
    if (!token) dispatch(fetchArticles(offset));
    if (token) dispatch(fetchArticlesAuth({ token, offset }));
  }, [dispatch, token, offset, currentPage]);

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  let articlesList;
  if (articles) {
    articlesList = articles.map((article: IArticle) => {
      return (
        <Article
          key={nanoid()}
          slug={article.slug}
          title={article.title}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          description={article.description}
          tagList={article.tagList}
          author={article.author}
          createdAt={article.createdAt}
        />
      );
    });
  }

  return (
    <main>
      <div className={classes.container}>
        <ul className={classes.list}>{articlesList}</ul>
        <Pagination currentPage={currentPage} />
      </div>

      {errorMessage !== '' && (
        <div className={classes.error}>{errorMessage}</div>
      )}
    </main>
  );
}
