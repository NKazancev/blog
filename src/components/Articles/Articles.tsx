import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { IArticle } from 'models/article';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchArticles } from 'store/slices/articlesSlice';

import Article from './Article/Article';
import Pagination from './Pagination/Pagination';
import * as classes from './Articles.module.css';

export default function Articles() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.articlesSlice);

  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  useEffect(() => {
    const offset = 5 * (currentPage - 1);
    localStorage.setItem('offset', JSON.stringify(offset));
    dispatch(fetchArticles(offset));
  }, [dispatch, currentPage]);

  const articlesList = articles.map((article: IArticle) => {
    return (
      <Article
        key={nanoid()}
        slug={article.slug}
        title={article.title}
        favoritesCount={article.favoritesCount}
        description={article.description}
        tagList={article.tagList}
        author={article.author}
        createdAt={article.createdAt}
      />
    );
  });

  return (
    <main>
      <div className={classes.container}>
        <ul className={classes.list}>{articlesList}</ul>
        <Pagination currentPage={currentPage} />
      </div>
    </main>
  );
}
