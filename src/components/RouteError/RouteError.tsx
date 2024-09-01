import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import * as classes from './RouteError.module.css';

export default function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={classes.container}>
        <p className={classes.text}>Sorry, an unexpected error has occurred.</p>
        <p className={classes.text}>{error.status}</p>
        <p className={classes.text}>{error.statusText}</p>
        {error.data.message && <p>{error.data.message}</p>}
      </div>
    );
  }
}
