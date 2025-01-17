import styled from 'styled-components';

export const BreadcrumbsWrapper = styled.nav`
  .chakra-breadcrumb__list-item{
    a, span {
      font-weight: 600;
      text-transform: capitalize;
      color: ${({ theme }) => theme.dark};
    }
    span {
      color: ${({ theme }) => theme.secColor};
    }
  }
`;