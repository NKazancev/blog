import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeArticle } from 'store/slices/articlesSlice';
import fetchArticlePage from 'store/thunks/fetchArticlePage';
import fetchArticlePageAuth from 'store/thunks/fetchArticlePageAuth';

import ArticleDescription from '../ArticleDescription/ArticleDescription';
import ArticleAuthor from '../ArticleAuthor/ArticleAuthor';

import * as classes from './ArticlePage.module.css';
import Confirmation from './Confirmation/Confirmation';

export default function ArticlePage() {
  const { token, username } = JSON.parse(localStorage.getItem('user') || '{}');
  const { article } = useAppSelector((state) => state.articlesSlice);
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(removeArticle());
    if (slug) {
      if (!token) dispatch(fetchArticlePage(slug));
      if (token) dispatch(fetchArticlePageAuth({ token, slug }));
    }
  }, [dispatch, token, slug]);

  return (
    article && (
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

          <ArticleAuthor
            author={article.author}
            createdAt={article.createdAt}
          />

          {article.author.username === username && (
            <div className={classes.buttons}>
              <button
                type="button"
                onClick={() => setIsModalVisible(true)}
                className={classes.button}
              >
                Delete
              </button>
              {isModalVisible && (
                <Confirmation
                  slug={slug}
                  onClose={() => setIsModalVisible(false)}
                />
              )}
              <Link to="edit" className={classes.link}>
                Edit
              </Link>
            </div>
          )}
        </div>

        <div className={classes.body}>
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    )
  );
}
