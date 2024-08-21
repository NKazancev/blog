export interface IPaginationList {
  articlesNumber: number;
  articlesPerPage: number;
  visibleBtns: number;
  currentPage: number;
  onPageChange: (current: number, offsetValue: number) => void;
}
