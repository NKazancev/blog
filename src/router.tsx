import { createHashRouter } from 'react-router-dom';

import App from './components/App';
import Articles from './components/Articles/Articles';
import ArticlePage from './components/Articles/ArticlePage/ArticlePage';
import CreateArticle from './components/Forms/CreateArticle';
import ArticlePageUpdate from './components/Articles/ArticlePageUpdate/ArticlePageUpdate';
import UserAuthentication from './components/Forms/UserAuthentication';
import UserRegistration from './components/Forms/UserRegistration';
import UserUpdate from './components/Forms/UserUpdate';
import RouteError from './components/RouteError/RouteError';
import RequireAuth from './utils/RequireAuth';

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
        element: <ArticlePageUpdate />,
      },
      {
        path: 'new-article',
        element: (
          <RequireAuth>
            <CreateArticle />
          </RequireAuth>
        ),
      },
      {
        path: 'sign-in',
        element: <UserAuthentication />,
      },
      {
        path: 'sign-up',
        element: <UserRegistration />,
      },
      {
        path: 'user',
        element: <UserUpdate />,
      },
    ],
  },
]);

export default router;
