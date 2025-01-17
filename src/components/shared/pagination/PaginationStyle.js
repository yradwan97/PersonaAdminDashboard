import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  padding-top: 1.5rem;
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-inline-end: .5rem;
      margin-bottom: .5rem;
      &.active, &.disabled {
        a {
          color: ${({ theme }) => theme.secColor};
          user-select: none;
          user-select: none;
          cursor: no-drop;
        }
      }

      a {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: ${({ theme }) => theme.light};
        color: ${({ theme }) => theme.dark};
        box-shadow: 0px 10px 6px #00000029;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }
`;