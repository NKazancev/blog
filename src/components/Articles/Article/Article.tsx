import { Link } from 'react-router-dom';

import { IArticle } from 'models/article';

import ArticleAuthor from '../ArticleAuthor/ArticleAuthor';
import ArticleDescription from '../ArticleDescription/ArticleDescription';

import * as classes from './Article.module.css';

export default function Article(props: IArticle) {
  const {
    slug,
    title,
    description,
    favoritesCount,
    tagList,
    author,
    createdAt,
  } = props;

  return (
    <li className={classes.article}>
      <ArticleDescription
        description={description}
        descriptionColor="hsla(0, 0%, 0%, 0.75)"
        favoritesCount={favoritesCount}
        tagList={tagList}
      >
        <h3 className={classes.title}>
          <Link to={`/articles/${slug}`}>{title}</Link>
        </h3>
      </ArticleDescription>

      <ArticleAuthor author={author} createdAt={createdAt} />
    </li>
  );
}
