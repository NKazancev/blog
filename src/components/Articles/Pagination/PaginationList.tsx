import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { IPaginationList } from 'models/pagination';
import { DOTS, usePagination } from 'hooks/usePagination';

import * as classes from './PaginationList.module.css';

export default function PaginationList(props: IPaginationList) {
  const { articlesNumber, articlesPerPage, visibleBtns, currentPage } = props;

  const paginationArray = usePagination(
    articlesNumber,
    articlesPerPage,
    visibleBtns,
    currentPage
  );

  const navigate = useNavigate();

  const paginationList = paginationArray?.map((btn) => {
    return btn === DOTS ? (
      <li className={classes.item} key={nanoid()}>
        <span className={classes.dots}>{btn}</span>
      </li>
    ) : (
      <li className={classes.item} key={btn}>
        <button
          type="button"
          onClick={(e) =>
            navigate(`/articles/page/${e.currentTarget.textContent}`)
          }
          className={currentPage === btn ? classes.activeBtn : classes.btn}
        >
          {btn}
        </button>
      </li>
    );
  });

  return <ul className={classes.list}>{paginationList}</ul>;
}
