export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: false;
}

export interface IArticleAuthor {
  author: IAuthor;
  createdAt: string;
}

export interface IArticleDescription {
  description: string;
  descriptionColor?: string;
  favoritesCount: number;
  tagList: Array<string>;
  children?: React.ReactNode;
}

export interface IArticle extends IArticleAuthor, IArticleDescription {
  slug: string;
  title: string;
  body?: string;
}
