import { useState, useEffect, MouseEvent } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchArticles } from 'store/slices/articlesSlice';
import { usePagination, DOTS } from 'hooks/usePagination';
import arrowLeft from 'assets/arrow-left.svg';
import arrowRight from 'assets/arrow-right.svg';

import * as classes from './Pagination.module.css';

export default function Pagination() {
  const dispatch = useAppDispatch();

  const { articlesNumber } = useAppSelector((state) => state.articlesSlice);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const articlesPerPage = 5;
  const visibleBtns = 3;

  const paginationArray = usePagination(
    articlesNumber,
    articlesPerPage,
    visibleBtns,
    currentPage
  );

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [dispatch, offset]);

  const setPage = (e: MouseEvent<HTMLButtonElement>) => {
    const current = Number(e.currentTarget.textContent);
    const offsetValue = articlesPerPage * (current - 1);
    setCurrentPage(current);
    setOffset(offsetValue);
  };

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

  const paginationList = paginationArray?.map((btn) => {
    return btn === DOTS ? (
      <li className={classes.item} key={nanoid()}>
        <span className={classes.dots}>{btn}</span>
      </li>
    ) : (
      <li className={classes.item} key={btn}>
        <button
          type="button"
          onClick={(e) => setPage(e)}
          className={currentPage === btn ? classes.activeBtn : classes.btn}
        >
          {btn}
        </button>
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button type="button" onClick={prevPage} className={classes.arrowLeft}>
          <img src={arrowLeft} alt="arrow-left" />
        </button>

        <ul className={classes.list}>{paginationList}</ul>

        <button type="button" onClick={nextPage} className={classes.arrowRight}>
          <img src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
}
