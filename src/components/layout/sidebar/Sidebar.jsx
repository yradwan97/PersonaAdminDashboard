import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Box, Flex, Text,
  Image, Accordion, AccordionItem, AccordionButton, AccordionPanel
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { toggleSidebar } from '../../../store/sidebar/sidebarSlice';

import systemBg from '../../../assets/images/logo.png';

import { SidebarOverlay, SidebarWrapper } from './SidebarStyle';

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar);

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  }

  return (
    <>
      {sidebar.isNotOpened && (
        <SidebarOverlay as={Box}
          className="sidebar-overlay" position="fixed" top="0" right="0" w="100%" h="100vh" bg="rgba(0, 0, 0, .5)" zIndex="99"
          role="button" onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <SidebarWrapper className={sidebar.isNotOpened ? 'active' : ''}>
        <Flex alignItems="center" mb={8}>
          <Image w="120px" src={systemBg} />
        </Flex>

        <Text
          textTransform="capitalize" mb={4} className="text"
          fontSize={16} color="#5e76a1" fontWeight="600"
        >
          {t('layout.sidebar.navigation')}
        </Text>

        <Box className="sidebar-links">
          <Accordion allowToggle={true} border="none">

            <AccordionItem border="none">
              <NavLink to="/" end onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiHome /></span>
                  <span className="text">{t('layout.sidebar.dashboard')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <AccordionButton>
                <Flex alignItems="center" justifyContent="space-between" width="100%">
                  <Flex alignItems="center">
                    <span className="icon"><FiIcons.FiSettings /></span>
                    <span className="text">{t('layout.sidebar.settings')}</span>
                  </Flex>
                  <span className="collapse-icon"><FiIcons.FiChevronRight /></span>
                </Flex>
              </AccordionButton>
              <AccordionPanel padding={0}>
                <ul>
                  <li>
                    <NavLink to="/settings/home">
                      <FiIcons.FiChevronRight />
                      <span>{t('layout.sidebar.home')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings/global">
                      <FiIcons.FiChevronRight />
                      <span>{t('layout.sidebar.global')}</span>
                    </NavLink>
                  </li>
                </ul>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="users" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiUsers /></span>
                  <span className="text">{t('layout.sidebar.users')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="alerts" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiBookmark /></span>
                  <span className="text">{t('layout.sidebar.alerts')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="features" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiAlignJustify /></span>
                  <span className="text">{t('layout.sidebar.features')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="testmonials" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiSliders /></span>
                  <span className="text">{t('layout.sidebar.testmonials')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>
          </Accordion>
        </Box>
      </SidebarWrapper>
    </>
  )
}

export default Sidebar