import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import fetchArticlePage from 'store/thunks/fetchArticlePage';

import CreateArticle from '../../Forms/CreateArticle';

export default function ArticlePageUpdate() {
  const { slug } = useParams();
  const { article } = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) dispatch(fetchArticlePage(slug));
  }, [dispatch, slug]);

  return <CreateArticle isEditing article={article} slug={slug} />;
}
