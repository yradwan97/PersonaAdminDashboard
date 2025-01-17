import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  background: ${({ theme }) => theme.light};
  box-shadow: 0px 0px 30px 0px rgba(82, 63, 105, 0.05);
  padding: 1rem;
  .chakra-menu__menu-list {
    padding: 0;
    background: ${({ theme }) => theme.light};
  }
  .input-search, .profile-text {
    @media only screen and (max-width: 991px) {
      display: none;
    }
  }
`;