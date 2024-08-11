import React from 'react';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        prev page
      </button>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        1
      </button>
      <button disabled={page === 2} onClick={() => setPage(2)}>
        2
      </button>
      <button disabled={page === 3} onClick={() => setPage(3)}>
        3
      </button>
      <button disabled={page === 4} onClick={() => setPage(4)}>
        4
      </button>
      <button disabled={page === 5} onClick={() => setPage(5)}>
        5
      </button>
      <button disabled={page === 6} onClick={() => setPage(6)}>
        6
      </button>
      <button disabled={page === 7} onClick={() => setPage(7)}>
        7
      </button>
      <button disabled={page === 7} onClick={() => setPage(page + 1)}>
        next page
      </button>
    </>
  );
};

export default Pagination;
