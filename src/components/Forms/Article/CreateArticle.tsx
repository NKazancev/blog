import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IArticle } from 'models/article';
import fetchArticleCreation from 'store/thunks/fetchArticleCreation';
import fetchArticleUpdate from 'store/thunks/fetchArticleUpdate';

import * as classes from '../Form.module.css';
import InputBorder from '../InputBorder';

import * as _classes from './CreateArticle.module.css';

type CreateArticleForm = {
  title: string;
  description: string;
  text: string;
  tags: Array<{ tag: string }>;
};

type PropsForm = {
  isEditing?: boolean;
  slug?: string | undefined;
  article?: IArticle | null;
};

export default function CreateArticle(props: PropsForm) {
  const { isEditing = false, slug, article } = props;

  const { register, handleSubmit, control, formState } =
    useForm<CreateArticleForm>({
      defaultValues: {
        title: article?.title || '',
        description: article?.description || '',
        text: article?.body || '',
        tags: [{ tag: '' }],
      },
      shouldFocusError: false,
    });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const { token } = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch = useAppDispatch();

  const onSubmit = (data: CreateArticleForm) => {
    const tagList = data.tags.reduce(
      (acc: Array<string>, el: { tag: string }) => {
        acc.push(el.tag);
        return acc;
      },
      []
    );
    if (!isEditing) {
      const createdArticle = {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList,
      };
      dispatch(fetchArticleCreation({ token, articleData: createdArticle }));
    } else {
      const editedArticle = {
        title: data.title,
        description: data.description,
        body: data.text,
      };
      dispatch(fetchArticleUpdate({ token, slug, articleData: editedArticle }));
    }
  };

  const { isCreated, isUpdated } = useAppSelector(
    (state) => state.articlesSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreated || isUpdated) {
      navigate('/articles');
    }
  }, [navigate, isCreated, isUpdated]);

  const { Black, Red } = InputBorder;

  return (
    <div className={_classes.container}>
      <div className={classes.body}>
        <h3 className={classes.title}>
          {isEditing ? 'Edit article' : 'Create new article'}
        </h3>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <p>
            <label htmlFor="handle-article-title" className={classes.label}>
              Title
              <input
                type="text"
                id="handle-article-title"
                style={
                  errors.title?.message
                    ? { borderColor: Red }
                    : { borderColor: Black }
                }
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required',
                  },
                })}
              />
              <strong>{errors.title?.message}</strong>
            </label>
          </p>

          <p>
            <label htmlFor="handle-article-desc" className={classes.label}>
              Short description
              <input
                type="text"
                id="handle-article-desc"
                {...register('description', {
                  required: false,
                })}
              />
            </label>
          </p>

          <p>
            <label htmlFor="handle-article-text" className={classes.label}>
              Text
              <textarea
                id="handle-article-text"
                style={{ minHeight: '168px' }}
                {...register('text', {
                  required: false,
                })}
              />
            </label>
          </p>

          <div className={classes.label}>
            Tags
            <div className={_classes.tags}>
              <ul className={classes.list} style={{ rowGap: '5px' }}>
                {fields.map((field, index) => {
                  return (
                    <li key={field.id} className={_classes.tag}>
                      <input
                        type="text"
                        style={{ width: '300px' }}
                        {...register(`tags.${index}.tag`)}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={_classes.tagBtnRemove}
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => append({ tag: '' })}
                className={_classes.tagBtnAdd}
              >
                Add tag
              </button>
            </div>
          </div>

          <button type="submit" style={{ width: '320px' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
