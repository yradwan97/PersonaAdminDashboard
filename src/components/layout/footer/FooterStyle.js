import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  text-align: center;
  padding: 1rem 0;
  background: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.dark};
  text-transform: capitalize;
  font-size: 1rem;
  box-shadow: 0px 0px 30px 0px rgba(82, 63, 105, 0.05);
  a {
    color: ${({ theme }) => theme.error}
  }
`;