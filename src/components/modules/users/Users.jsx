import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Text, InputGroup, Input, InputRightElement, SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import Pagination from 'src/components/shared/pagination/Pagination';
import Breadcrumbs from 'src/components/shared/breadcrumbs/Breadcrumbs';
import UsersTable from './Table';
import CreateModal from './actions/CreateModal';
import UpdateModal from './actions/UpdateModal';
import DeleteModal from './actions/DeleteModal';

import { getUsers } from 'src/store/users/usersSlice';

import { Wrapper } from './Styles';

import theme from '../../global/theme';

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  useEffect(() => {
    dispatch(getUsers({ page, query }));
  }, [dispatch, page, query]);


  return (
    <Wrapper>
      <Breadcrumbs
        currentPage={t('pages.users.users')}
        pages={[{ name: `${t('pages.dashboard.dashboard')}`, path: '/' }]}
      />

      {users.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{users.error}</Text>
        </Alert>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2 }} justifyContent="space-between">
        <Flex marginBottom={8}>
          <Button bg="red.600" textTransform="uppercase"
            fontWeight="bold" fontSize={18} marginInlineEnd={4} color="white" _hover={{ bg: 'red.600' }}
            onClick={() => setShowCreateUser(true)}
          >
            {t('general.create')} +
          </Button>
        </Flex>

        <Flex marginBottom={8} justifyContent="flex-end">
          <InputGroup width="auto">
            <Input auth="auto" type="text" placeholder={t('general.search')}
              bg={theme.light} boxShadow={theme.shadow} color={theme.dark} border="none"
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <InputRightElement color={theme.light} children={<FiIcons.FiSearch />} />
          </InputGroup>
        </Flex>
      </SimpleGrid>

      {users.itemsCount > 0 ? (
        <UsersTable
          data={users.data}
          page={page}
          handleUpdate={(el) => setShowUpdateUser(el)}
          handleDelete={(el) => setShowDeleteUser(el)}
        />
      ) : (
        <Flex textAlign="center" bg={theme.light} boxShadow={theme.shadow} height={200} alignItems="center"
          justifyContent="center" borderRadius={16}>
          <Text fontSize={18} textTransform="capitalize" color="gray.300" fontWeight="bold">
            {t('pages.users.no_users')}
          </Text>
        </Flex>
      )}

      <Flex justifyContent="flex-end">
        <Pagination
          page={page}
          itemsCount={users.itemsCount ?? 0}
          onChange={(page) => setPage(page)}
        />
      </Flex>

      {showCreateUser && <CreateModal onClose={() => setShowCreateUser(false)} />}
      {showUpdateUser && <UpdateModal data={showUpdateUser} onClose={() => setShowUpdateUser(false)} />}
      {showDeleteUser && <DeleteModal data={showDeleteUser} onClose={() => setShowDeleteUser(false)} />}
    </Wrapper>
  )
}

export default Users