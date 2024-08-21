export interface IAuthor {
  bio: string;
  following: false;
  image: string;
  username: string;
}

export interface IArticle {
  slug: string;
  author: IAuthor;
  description: string;
  favoritesCount: number;
  tagList: Array<string>;
  title: string;
}
