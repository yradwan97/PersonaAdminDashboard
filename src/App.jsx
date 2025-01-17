import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/global/GlobalStyles';
import Navigations from './components/navigations/Navigations';


import theme from './components/global/theme';


const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <ThemeProvider theme={{
      ...theme,
      start: i18n.language === "en" ? "left" : "right",
      end: i18n.language === "en" ? "right" : "left"
    }}>
      <ChakraProvider>
        <GlobalStyles />
        <Navigations />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App