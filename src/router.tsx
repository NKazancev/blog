import { createHashRouter } from 'react-router-dom';

import App from './components/App';
import Articles from './components/Articles/Articles';
import ArticlePage from './components/Articles/ArticlePage/ArticlePage';
import Authentication from './components/Forms/User/Authentication';
import Registration from './components/Forms/User/Registration';
import EditProfile from './components/Forms/User/EditProfile';
import CreateArticle from './components/Forms/Article/CreateArticle';
import EditArticlePage from './components/Articles/ArticlePage/EditArticlePage';
import RouteError from './components/RouteError/RouteError';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
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
        path: 'articles/:slug/edit',
        element: <EditArticlePage />,
      },
      {
        path: 'new-article',
        element: <CreateArticle />,
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
