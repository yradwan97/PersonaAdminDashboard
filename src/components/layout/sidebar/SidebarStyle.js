import styled, { css } from 'styled-components';

export const SidebarOverlay = styled.div`
  @media only screen and (min-width: 992px) {
    display: none !important;
  }
`;

export const SidebarWrapper = styled.aside`
  z-index: 100;
  width: 260px;
  position: fixed;
  ${({ theme }) => theme.start}: -260px;
  background: ${({ theme }) => theme.dark};
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  padding: 1.5rem 1rem;
  transition: .5s;
  @media only screen and (min-width: 992px) {
    ${({ theme }) => theme.start}: 0;
    width: 260px;
  }
  &.active {
    ${({ theme }) => theme.start}: 0;
  }
  .sidebar-links {
    .chakra-accordion {
      .chakra-accordion__item {
        .chakra-accordion__button {
          display: block;
          padding: .8rem 1rem;
          position: relative;
          border-radius: 8px;
          color: ${({ theme }) => theme.light};
          margin-bottom: .5rem;
          &:hover {
            background: none;
          }
          .icon {
            color: ${({ theme }) => theme.light};
            font-size: 19px;
            margin-top: -4px;
          }
          .text {
            margin: 0 1rem;
            text-transform: capitalize;
            font-weight: 600;
            font-size: 14px;
          }
          .collapse-icon {
            transition: .3s;
            ${({ theme }) => theme.start === 'right' && css`
              transform: rotate(180deg);
            `}
          }
          &[aria-expanded="true"], &.active {
            background: ${({ theme }) => theme.lightBg};
            .icon, .collapse-icon {
              color: ${({ theme }) => theme.mainColor};
            }
            .collapse-icon {
              transform: rotate(90deg);
            }
          }
        }
        .chakra-collapse {
          ul {
            list-style: none;
            margin-bottom: 1rem;
            margin-inline-start: 1rem;
            li {
              margin-bottom: .5rem;
              &:last-child {
                margin-bottom: 0;
              }
              a {
                display: flex;
                align-items: center;
                &.active {
                  span {
                    color: ${({ theme }) => theme.mainColor};
                  }
                }
                svg {
                  margin-top: -4px;
                  color: ${({ theme }) => theme.mainColor};
                  font-size: 13px;
                  ${({ theme }) => theme.start === 'right' && css`
                    transform: rotate(180deg);
                  `}
                }
                span {
                  color: ${({ theme }) => theme.light};
                  padding: 0 .3rem;
                  text-transform: capitalize;
                  font-size: 12px;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
    }
  }
`;