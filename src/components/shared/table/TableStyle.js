import styled from 'styled-components';

export const TableWrapper = styled.section`
  table {
    background: ${({ theme }) => theme.light};
    box-shadow: 0 0 30px red;
    thead {
      tr {
        th {
          padding: .8rem .3rem;
          color: ${({ theme }) => theme.dark};
          text-transform: ${({ headTextTransform }) => headTextTransform || "capitalize"};
          border-bottom: 2px solid ${({ theme }) => theme.border};
        }
      }
    }
    tbody {
      tr {
        border-bottom: 2px solid ${({ theme }) => theme.border};
        &:last-child {
          border-bottom: 0;
        }
        td {
          text-align: center;
          padding: 1.3rem .3rem;
          text-transform: capitalize;
          font-weight: bold;
          font-size: 14px;
          max-width: 200px;
          white-space: normal;
          color: ${({ theme }) => theme.dark};
        }
      }
    }
  }
`;