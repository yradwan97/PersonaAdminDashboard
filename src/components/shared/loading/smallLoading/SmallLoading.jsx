import React from 'react';

import { Flex, CircularProgress } from '@chakra-ui/react';

import { SmallLoadingWrapper } from './SmallLoadingStyle';

const SmallLoading = () => {
  return (
    <SmallLoadingWrapper>
      <Flex textAlign="center" bg={theme.light} boxShadow={theme.shadow} height={200} alignItems="center"
        justifyContent="center" borderRadius={16}
      >
        <CircularProgress isIndeterminate />
      </Flex>
    </SmallLoadingWrapper>
  )
}

export default SmallLoading