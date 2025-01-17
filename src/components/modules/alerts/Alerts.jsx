import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Text, InputGroup, Input, InputRightElement, SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import Pagination from 'src/components/shared/pagination/Pagination';
import Breadcrumbs from 'src/components/shared/breadcrumbs/Breadcrumbs';
import AlertsTable from './Table';
import CreateModal from './actions/CreateModal';
import UpdateModal from './actions/UpdateModal';
import DeleteModal from './actions/DeleteModal';

import { getAlerts } from 'src/store/alerts/alertsSlice';

import { Wrapper } from './Styles';

import theme from '../../global/theme';

const Alerts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    dispatch(getAlerts({ page, query }));
  }, [dispatch, page, query]);


  return (
    <Wrapper>
      <Breadcrumbs
        currentPage={t('pages.alerts.alerts')}
        pages={[{ name: `${t('pages.dashboard.dashboard')}`, path: '/' }]}
      />

      {alerts.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{alerts.error}</Text>
        </Alert>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2 }} justifyContent="space-between">
        <Flex marginBottom={8}>
          <Button bg="red.600" textTransform="uppercase"
            fontWeight="bold" fontSize={18} marginInlineEnd={4} color="white" _hover={{ bg: 'red.600' }}
            onClick={() => setShowCreateAlert(true)}
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

      {alerts.itemsCount > 0 ? (
        <AlertsTable
          data={alerts.data}
          page={page}
          handleUpdate={(el) => setShowUpdateAlert(el)}
          handleDelete={(el) => setShowDeleteAlert(el)}
        />
      ) : (
        <Flex textAlign="center" bg={theme.light} boxShadow={theme.shadow} height={200} alignItems="center"
          justifyContent="center" borderRadius={16}>
          <Text fontSize={18} textTransform="capitalize" color="gray.300" fontWeight="bold">
            {t('pages.alerts.no_alerts')}
          </Text>
        </Flex>
      )}

      <Flex justifyContent="flex-end">
        <Pagination
          page={page}
          itemsCount={alerts.itemsCount ?? 0}
          onChange={(page) => setPage(page)}
        />
      </Flex>

      {showCreateAlert && <CreateModal onClose={() => setShowCreateAlert(false)} />}
      {showUpdateAlert && <UpdateModal data={showUpdateAlert} onClose={() => setShowUpdateAlert(false)} />}
      {showDeleteAlert && <DeleteModal data={showDeleteAlert} onClose={() => setShowDeleteAlert(false)} />}
    </Wrapper>
  )
}

export default Alerts