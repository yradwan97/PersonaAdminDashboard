import React from 'react';

import { CircularProgress } from '@chakra-ui/react';

import { PageLoadingWrapper } from './PageLoadingStyle';

const PageLoading = () => {
  return (
    <PageLoadingWrapper>
      <CircularProgress isIndeterminate />
    </PageLoadingWrapper>
  )
}

export default PageLoading