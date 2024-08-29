import { useFieldArray, useForm } from 'react-hook-form';

import InputBorder from '../InputBorder';
import * as classes from '../Form.module.css';

import * as _classes from './CreateArticle.module.css';

type CreateArticleForm = {
  title: string;
  description: string;
  text: string;
  tags: Array<{ tag: string }>;
};

export default function CreateArticle({ isEditing = false }) {
  const form = useForm<CreateArticleForm>({
    defaultValues: {
      title: '',
      description: '',
      text: '',
      tags: [{ tag: '' }],
    },
    shouldFocusError: false,
  });

  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const { Black, Red } = InputBorder;

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const onSubmit = (data: CreateArticleForm) => {
    const article = {
      title: data.title,
      description: data.description,
      body: data.text,
      tags: data.tags.reduce((acc: Array<string>, el: { tag: string }) => {
        acc.push(el.tag);
        return acc;
      }, []),
    };
    return article;
  };

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
              <input type="text" id="handle-article-desc" />
            </label>
          </p>

          <p>
            <label htmlFor="handle-article-text" className={classes.label}>
              Text
              <textarea
                id="handle-article-text"
                style={{ minHeight: '168px' }}
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
