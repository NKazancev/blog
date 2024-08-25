export interface IPagination {
  currentPage: number;
}

export interface IPaginationList extends IPagination {
  articlesNumber: number;
  articlesPerPage: number;
  visibleBtns: number;
}
