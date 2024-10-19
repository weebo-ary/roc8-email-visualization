// src/components/Pagination.jsx

import React from 'react';

const Pagination = ({ page, handleNextPage, handlePrevPage }) => {
  return (
    <div className="flex items-center justify-start mt-4 gap-5">
      <button onClick={handlePrevPage} disabled={page === 1} className="disabled:text-gray-300">
        Previous &lt;
      </button>
      <span className="text-xs">
        Page:{page}
      </span>
      <button onClick={handleNextPage} className="disabled:text-gray-300">
        &gt; Next
      </button>
    </div>
  );
};

export default Pagination;
