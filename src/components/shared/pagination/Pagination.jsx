import React from 'react';
import ReactJsPagination from 'react-js-pagination';

import { PaginationWrapper } from './PaginationStyle';

const Pagination = ({ page, size = 10, itemsCount, onChange }) => {
  return (
    <PaginationWrapper>
      <ReactJsPagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={itemsCount}
        pageRangeDisplayed={size}
        hideDisabled={true}
        onChange={onChange}
      />
    </PaginationWrapper>
  )
}

export default Pagination