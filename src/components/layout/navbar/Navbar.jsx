import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button, Flex,
  Menu, MenuButton,
  MenuList, Text,
  Avatar, Box, Divider
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { toggleSidebar } from '../../../store/sidebar/sidebarSlice';
import { logout } from '../../../store/auth/authSlice';

import { NavbarWrapper } from './NavbarStyle';

import theme from '../../global/theme';


const languages = [
  {
    name: 'arabic',
    path: 'ar'
  },
  {
    name: 'english',
    path: 'en'
  },
]

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const sidebar = useSelector(state => state.sidebar);

  return (
    <NavbarWrapper className={`${sidebar.isNotOpened ? 'active' : ''}`}>
      <Flex alignItems="center" justifyContent="space-between">

        {/* start side */}
        <Button
          p={0} bg="none"
          width="auto" color={theme.dark}
          _hover={{ bg: "none" }} _focus={{ outline: "none" }}
          marginInlineEnd={4} onClick={() => dispatch(toggleSidebar())}
        >
          <FiIcons.FiAlignRight size={25} />
        </Button>

        {/* end side */}
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button} bg="none" color={theme.dark}
              _hover={{ bg: "none" }} _focus={{ outline: "none" }}
            >
              <FiIcons.FiGlobe size={20} />
            </MenuButton>
            <MenuList minW="auto">
              <ul>
                {languages.map((el, index) => (
                  <li key={index}>
                    <Button
                      width="100%" bg="none" _hover={{ bg: "none" }} color={theme.dark} textTransform="capitalize"
                      isDisabled={el.path === i18n.language}
                      onClick={() => i18n.changeLanguage(el.path)}
                    >
                      {t(`general.${el.name}`)}
                    </Button>
                  </li>
                ))}
              </ul>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button} bg="none" color={theme.dark}
              _hover={{ bg: "none" }} _focus={{ outline: "none" }}
            >
              <Flex alignItems="center">
                <Avatar name={auth.user?.name} size="sm" src={auth.user?.image} />
                <Text className="profile-text"
                  marginInline={3} textTransform="capitalize"
                  fontSize={14}
                >
                  {auth.user?.name && auth.user.name.slice(0, 5)}
                </Text>
                <FiIcons.FiChevronDown size={16} />
              </Flex>
            </MenuButton>
            <MenuList minW="150px">
              <Box paddingBlock={2} paddingInline={4}>

                <Text
                  color={theme.dark} textTransform="capitalize" textAlign="center"
                >
                  {auth.user?.name && auth.user.name.slice(0, 10)}
                </Text>
                <Divider marginBlock={2} />
                <Box>
                  <Button type="button" size="sm" width="100%"
                    color={theme.dark} textTransform="capitalize"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                  >
                    {t('layout.navbar.logout')}
                  </Button>
                </Box>
              </Box>
            </MenuList>
          </Menu>

        </Flex>

      </Flex>
    </NavbarWrapper>
  )
}

export default Navbar