import { createHashRouter } from 'react-router-dom';

import App from './components/App';
import Articles from './components/Articles/Articles';
import Authorization from './components/Authorization/Authorization';
import Registration from './components/Registration/Registration';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Articles />,
      },
      {
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'sign-in',
        element: <Authorization />,
      },
      {
        path: 'sign-up',
        element: <Registration />,
      },
    ],
  },
]);

export default router;
