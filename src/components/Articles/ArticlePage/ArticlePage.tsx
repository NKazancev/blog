import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IArticle } from 'models/article';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchArticles } from 'store/slices/articlesSlice';

import * as classes from './ArticlePage.module.css';

export default function ArticlePage() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.articlesSlice);

  const { slug } = useParams();
  const [article, setArticle] = useState<IArticle | undefined>();

  useEffect(() => {
    const offset = Number(localStorage.getItem('offset'));
    if (!articles.length) {
      dispatch(fetchArticles(offset));
    }
    const pickedArticle = articles.find((item) => item.slug === slug);
    setArticle(pickedArticle);
  }, [dispatch, articles, slug]);

  return (
    article && (
      <div className={classes.container}>
        <h3 className={classes.title}>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    )
  );
}
