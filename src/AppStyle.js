import styled from 'styled-components';

export const AppWrapper = styled.section`
  display: flex;
  .content-wrapper {
    border-radius: 50px;
    background: ${({ theme }) => theme.bgLight};
    width: 100%;
    transition: all .5s;
    @media only screen and (min-width: 992px) {
      ${({ theme }) => `margin-${theme.start}`}: 260px;
    }
    .content {
      min-height: 100vh;
      .app-content {
        padding: .5rem;
        @media only screen and (min-width: 992px) {
          padding: 1.5rem;
        }
      }
    }
  }
`;