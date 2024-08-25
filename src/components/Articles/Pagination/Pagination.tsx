import { useNavigate } from 'react-router-dom';

import { IPagination } from 'models/pagination';
import { useAppSelector } from 'store/hooks';
import arrowLeft from 'assets/arrow-left.svg';
import arrowRight from 'assets/arrow-right.svg';

import PaginationList from './PaginationList';
import * as classes from './Pagination.module.css';

export default function Pagination(props: IPagination) {
  const { currentPage } = props;
  const { articlesNumber } = useAppSelector((state) => state.articlesSlice);

  const navigate = useNavigate();

  const prevPage = () => {
    if (currentPage === 1) return;
    navigate(`/articles/page/${currentPage - 1}`);
  };

  const nextPage = () => {
    const lastPage = Math.ceil(articlesNumber / 5);
    if (currentPage === lastPage) return;
    navigate(`/articles/page/${currentPage + 1}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button type="button" onClick={prevPage} className={classes.arrowLeft}>
          <img src={arrowLeft} alt="arrow-left" />
        </button>

        <PaginationList
          articlesNumber={articlesNumber}
          articlesPerPage={5}
          visibleBtns={3}
          currentPage={currentPage}
        />

        <button type="button" onClick={nextPage} className={classes.arrowRight}>
          <img src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
}
