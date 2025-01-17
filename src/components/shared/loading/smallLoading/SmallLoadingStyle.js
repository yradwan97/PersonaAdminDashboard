import styled from 'styled-components';

export const SmallLoadingWrapper = styled.section`
  .chakra-progress__track {
    stroke: ${({ theme }) => theme.border};
  }
  .chakra-progress__indicator {
    stroke: ${({ theme }) => theme.mainColor};
  }
`;