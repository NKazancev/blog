import useDate from 'hooks/useDate';
import { IArticleAuthor } from 'models/article';

import * as classes from './ArticleAuthor.module.css';

export default function ArticleAuthor(props: IArticleAuthor) {
  const { author, createdAt } = props;

  const [month, day, year] = useDate(createdAt);

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <span className={classes.name}>{author.username}</span>
        <span className={classes.creationDate}>
          {month} {day}, {year}
        </span>
      </div>

      <div className={classes.avatar}>
        <img src={author.image} alt="avatar" />
      </div>
    </div>
  );
}
