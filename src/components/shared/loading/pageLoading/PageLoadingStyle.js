import styled from 'styled-components';

export const PageLoadingWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .chakra-progress__track {
    stroke: ${({ theme }) => theme.border};
  }
  .chakra-progress__indicator {
    stroke: ${({ theme }) => theme.mainColor};
  }
`;