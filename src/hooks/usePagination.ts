import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_: number, i: number) => i + start);
};

export const usePagination = (
  itemsNumber: number,
  itemsNumberPerPage: number,
  visibleBtns: number,
  currentPage: number
) => {
  const paginationArray = useMemo(() => {
    const totalBtns = Math.ceil(itemsNumber / itemsNumberPerPage);

    const leftBtnsVisible = Math.max(currentPage - visibleBtns, 1);
    const rightBtnsVisible = Math.min(currentPage + visibleBtns, totalBtns);

    const leftDotsVisible = leftBtnsVisible > 3;
    const rightDotsVisible = rightBtnsVisible < totalBtns - 3;

    if (!leftDotsVisible && rightDotsVisible) {
      const leftBtnsCount = 3 + 2 * visibleBtns;
      const leftRange = range(1, leftBtnsCount);
      return [...leftRange, DOTS, totalBtns];
    }

    if (leftDotsVisible && !rightDotsVisible) {
      const rightBtnCount = 3 + 2 * visibleBtns;
      const rightRange = range(totalBtns - rightBtnCount + 1, totalBtns);
      return [1, DOTS, ...rightRange];
    }

    if (leftDotsVisible && rightDotsVisible) {
      const middleRange = range(leftBtnsVisible, rightBtnsVisible);
      return [1, DOTS, ...middleRange, DOTS, totalBtns];
    }

    return null;
  }, [itemsNumber, itemsNumberPerPage, visibleBtns, currentPage]);

  return paginationArray;
};
