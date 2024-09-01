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
  slug?: string;
  description: string;
  descriptionColor?: string;
  favorited?: boolean;
  favoritesCount: number;
  tagList: Array<string>;
  children?: React.ReactNode;
}

export interface IArticle extends IArticleAuthor, IArticleDescription {
  title: string;
  body?: string;
}
