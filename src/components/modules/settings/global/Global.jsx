import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import theme from "src/components/global/theme";
import Breadcrumbs from "src/components/shared/breadcrumbs/Breadcrumbs";
import { Wrapper } from "./Styles";

const Global = () => {
  const { t } = useTranslation();

  const TabEl = ({ title, link }) => (
    <ChakraLink
      as={NavLink} end to={link} display="inline-flex"
      textTransform="capitalize" borderBottom="none"
      paddingInline={6} paddingBlock={3}
      _selected={{ bg: "blue.600", color: "white", borderBottom: "none", outline: "none" }}
    >
      {title}
    </ChakraLink>
  );

  const tabs = [
    { title: t("pages.settings.global.config.config"), link: "" },
  ];


  return (
    <Wrapper>
      <Breadcrumbs
        currentPage={t("pages.settings.settings")}
        pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]}
      />

      <Box bg="white" boxShadow={theme.shadow} borderRadius={4} overflow="hidden" position="relative">
        <Box borderBottom="1px solid #eee">
          {tabs.map((tab, index) => (
            <TabEl title={tab.title} link={tab.link} key={index} />
          ))}
        </Box>
        <Box p={4}>
          <Outlet />
        </Box>
      </Box >
    </Wrapper>
  )
}

export default Global