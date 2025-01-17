import React from 'react';

import {
  Table as ChakraTable,
  TableContainer,
} from '@chakra-ui/react';

import { TableWrapper } from './TableStyle';

const Table = (props) => {
  return (
    <TableWrapper
      headBgColor={props.headBgColor}
      headColor={props.headColor}
      headBorder={props.headBorder}
      headBorderRadius={props.headBorderRadius}
      headTextTransform={props.headTextTransform}
    >
      <TableContainer>
        <ChakraTable {...props}>
          {props.children}
        </ChakraTable>
      </TableContainer>
    </TableWrapper>
  );
}

export default Table