import styled from "styled-components";

export const Wrapper = styled.div`
  .chakra-link.active {
    background-color: ${({ theme }) => theme.secColor};
    color: white
  }
`;