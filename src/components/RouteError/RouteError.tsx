import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import * as classes from './RouteError.module.css';

export default function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={classes.container}>
        <p className={classes.text}>Such page does not exist.</p>
        <Link to="/" className={classes.link}>
          Back to the homepage
        </Link>
      </div>
    );
  }
}
