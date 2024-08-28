import { createHashRouter } from 'react-router-dom';

import App from './components/App';
import Articles from './components/Articles/Articles';
import ArticlePage from './components/Articles/ArticlePage/ArticlePage';
import Authentication from './components/Forms/User/Authentication';
import Registration from './components/Forms/User/Registration';
import EditProfile from './components/Forms/User/EditProfile';
import HandleArticle from './components/Forms/Article/HandleArticle';

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
        path: 'articles/page/:page',
        element: <Articles />,
      },
      {
        path: 'articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: 'new-article',
        element: <HandleArticle />,
      },
      {
        path: 'sign-in',
        element: <Authentication />,
      },
      {
        path: 'sign-up',
        element: <Registration />,
      },
      {
        path: 'user',
        element: <EditProfile />,
      },
    ],
  },
]);

export default router;
