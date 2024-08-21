import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchArticles } from 'store/slices/articlesSlice';
import arrowLeft from 'assets/arrow-left.svg';
import arrowRight from 'assets/arrow-right.svg';

import PaginationList from './PaginationList';
import * as classes from './Pagination.module.css';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { articlesNumber } = useAppSelector((state) => state.articlesSlice);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 5;
  const visibleBtns = 3;

  useEffect(() => {
    dispatch(fetchArticles(offset));
    localStorage.setItem('offset', JSON.stringify(offset));
  }, [dispatch, offset]);

  const prevPage = () => {
    if (currentPage === 1) return;
    setOffset((prev) => prev - articlesPerPage);
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    const lastPage = Math.ceil(articlesNumber / articlesPerPage);
    if (currentPage === lastPage) return;
    setOffset((prev) => prev + articlesPerPage);
    setCurrentPage((prev) => prev + 1);
  };

  const setPage = (current: number, offsetValue: number) => {
    setCurrentPage(current);
    setOffset(offsetValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button type="button" onClick={prevPage} className={classes.arrowLeft}>
          <img src={arrowLeft} alt="arrow-left" />
        </button>

        <PaginationList
          articlesNumber={articlesNumber}
          articlesPerPage={articlesPerPage}
          visibleBtns={visibleBtns}
          currentPage={currentPage}
          onPageChange={setPage}
        />

        <button type="button" onClick={nextPage} className={classes.arrowRight}>
          <img src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
}
