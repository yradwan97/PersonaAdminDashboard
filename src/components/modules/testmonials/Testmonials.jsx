import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Text, InputGroup, Input, InputRightElement, SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import Pagination from 'src/components/shared/pagination/Pagination';
import Breadcrumbs from 'src/components/shared/breadcrumbs/Breadcrumbs';
import TestmonialsTable from './Table';
import CreateModal from './actions/CreateModal';
import UpdateModal from './actions/UpdateModal';
import DeleteModal from './actions/DeleteModal';

import { getTestmonials } from 'src/store/testmonials/testmonialsSlice';

import { Wrapper } from './Styles';

import theme from '../../global/theme';

const Testmonials = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const testmonials = useSelector(state => state.testmonials);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [showCreateTestmonial, setShowCreateTestmonial] = useState(false);
  const [showUpdateTestmonial, setShowUpdateTestmonial] = useState(false);
  const [showDeleteTestmonial, setShowDeleteTestmonial] = useState(false);

  useEffect(() => {
    dispatch(getTestmonials({ page, query }));
  }, [dispatch, page, query]);


  return (
    <Wrapper>
      <Breadcrumbs
        currentPage={t('pages.testmonials.testmonials')}
        pages={[{ name: `${t('pages.dashboard.dashboard')}`, path: '/' }]}
      />

      {testmonials.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{testmonials.error}</Text>
        </Alert>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2 }} justifyContent="space-between">
        <Flex marginBottom={8}>
          <Button bg="red.600" textTransform="uppercase"
            fontWeight="bold" fontSize={18} marginInlineEnd={4} color="white" _hover={{ bg: 'red.600' }}
            onClick={() => setShowCreateTestmonial(true)}
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

      {testmonials.itemsCount > 0 ? (
        <TestmonialsTable
          data={testmonials.data}
          page={page}
          handleUpdate={(el) => setShowUpdateTestmonial(el)}
          handleDelete={(el) => setShowDeleteTestmonial(el)}
        />
      ) : (
        <Flex textAlign="center" bg={theme.light} boxShadow={theme.shadow} height={200} alignItems="center"
          justifyContent="center" borderRadius={16}>
          <Text fontSize={18} textTransform="capitalize" color="gray.300" fontWeight="bold">
            {t('pages.testmonials.no_testmonials')}
          </Text>
        </Flex>
      )}

      <Flex justifyContent="flex-end">
        <Pagination
          page={page}
          itemsCount={testmonials.itemsCount ?? 0}
          onChange={(page) => setPage(page)}
        />
      </Flex>

      {showCreateTestmonial && <CreateModal onClose={() => setShowCreateTestmonial(false)} />}
      {showUpdateTestmonial && <UpdateModal data={showUpdateTestmonial} onClose={() => setShowUpdateTestmonial(false)} />}
      {showDeleteTestmonial && <DeleteModal data={showDeleteTestmonial} onClose={() => setShowDeleteTestmonial(false)} />}
    </Wrapper>
  )
}

export default Testmonials