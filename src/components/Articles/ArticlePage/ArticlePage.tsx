import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeArticle } from 'store/slices/articlesSlice';
import fetchArticlePage from 'store/thunks/fetchArticlePage';
import fetchArticlePageAuth from 'store/thunks/fetchArticlePageAuth';

import ArticleDescription from '../ArticleDescription/ArticleDescription';
import ArticleAuthor from '../ArticleAuthor/ArticleAuthor';
import Loader from '../../Loader/Loader';
import ArticleButtons from '../ArticleButtons/ArticleButtons';

import * as classes from './ArticlePage.module.css';

export default function ArticlePage() {
  const { token, username } = JSON.parse(localStorage.getItem('user') || '{}');
  const { article } = useAppSelector((state) => state.articlesSlice);
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeArticle());
    if (slug) {
      if (!token) dispatch(fetchArticlePage(slug));
      if (token) dispatch(fetchArticlePageAuth({ token, slug }));
    }
  }, [dispatch, token, slug]);

  return (
    <>
      {!article && <Loader />}

      {article && (
        <div className={classes.container}>
          <div className={classes.header}>
            <ArticleDescription
              slug={slug}
              description={article.description}
              descriptionColor="hsla(0, 0%, 0%, 0.5)"
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              tagList={article.tagList}
            >
              <h3 className="article-title">{article.title}</h3>
            </ArticleDescription>

            <div className={classes.user}>
              <ArticleAuthor
                author={article.author}
                createdAt={article.createdAt}
              />

              {article.author.username === username && (
                <ArticleButtons slug={slug} />
              )}
            </div>
          </div>

          <div className={classes.body}>
            <Markdown>{article.body}</Markdown>
          </div>
        </div>
      )}
    </>
  );
}
