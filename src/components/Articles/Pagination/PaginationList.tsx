import { MouseEvent } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { IPaginationList } from 'models/pagination';
import { usePagination, DOTS } from 'hooks/usePagination';

import * as classes from './PaginationList.module.css';

export default function PaginationList(props: IPaginationList) {
  const {
    articlesNumber,
    articlesPerPage,
    visibleBtns,
    currentPage,
    onPageChange,
  } = props;

  const paginationArray = usePagination(
    articlesNumber,
    articlesPerPage,
    visibleBtns,
    currentPage
  );

  const setPage = (e: MouseEvent<HTMLButtonElement>) => {
    const current = Number(e.currentTarget.textContent);
    const offsetValue = articlesPerPage * (current - 1);
    onPageChange(current, offsetValue);
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

  return <ul className={classes.list}>{paginationList}</ul>;
}
