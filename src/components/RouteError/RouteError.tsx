import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import * as classes from './RouteError.module.css';

export default function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={classes.container}>
        <p className={classes.text}>Такой страницы не существует.</p>
        <Link to="/" className={classes.link}>
          Перейти на главную
        </Link>
      </div>
    );
  }
}
