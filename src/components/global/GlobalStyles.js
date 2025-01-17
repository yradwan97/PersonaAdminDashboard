import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background: ${({ theme }) => theme.bg} !important;
    min-height: 100vh;
    overflow-x: hidden !important;
    @media print {
      padding: 2rem;
      table {
        padding-top: 2rem;
      }
    }
  }

  .chakra-input__right-element, .chakra-select__icon-wrapper {
    ${({ theme }) => theme.end}: .5rem !important;
    ${({ theme }) => theme.start}: auto !important;
  }

  .chakra-input__left-element {
    ${({ theme }) => theme.start}: .5rem !important;
    ${({ theme }) => theme.end}: auto !important;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #211f3c;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #211f3c;
  }

  ul, ol {
    list-style: none;
  }

  button {
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  textarea {
    resize: none !important;
  }
`;