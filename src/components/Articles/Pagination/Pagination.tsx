import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { IPagination } from 'models/pagination';
import { useAppSelector } from 'store/hooks';
import { usePagination, DOTS } from 'hooks/usePagination';
import arrowLeft from 'assets/arrow-left.svg';
import arrowRight from 'assets/arrow-right.svg';

import * as classes from './Pagination.module.css';

export default function Pagination(props: IPagination) {
  const { currentPage } = props;

  const { articlesNumber } = useAppSelector((state) => state.articlesSlice);
  const articlesPerPage = 5;
  const visibleBtns = 3;

  const navigate = useNavigate();

  const paginationArray = usePagination(
    articlesNumber,
    articlesPerPage,
    visibleBtns,
    currentPage
  );

  const paginationPanel = paginationArray?.map((btn) => {
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

  const prevPage = () => {
    if (currentPage === 1) return;
    navigate(`/articles/page/${currentPage - 1}`);
  };

  const nextPage = () => {
    const lastPage = Math.ceil(articlesNumber / articlesPerPage);
    if (currentPage === lastPage) return;
    navigate(`/articles/page/${currentPage + 1}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button type="button" onClick={prevPage} className={classes.arrowLeft}>
          <img src={arrowLeft} alt="arrow-left" />
        </button>

        <ul className={classes.list}>{paginationPanel}</ul>

        <button type="button" onClick={nextPage} className={classes.arrowRight}>
          <img src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
}
