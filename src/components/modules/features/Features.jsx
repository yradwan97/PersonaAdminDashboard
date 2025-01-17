import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Text, InputGroup, Input, InputRightElement, SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import Pagination from 'src/components/shared/pagination/Pagination';
import Breadcrumbs from 'src/components/shared/breadcrumbs/Breadcrumbs';
import FeaturesTable from './Table';
import CreateModal from './actions/CreateModal';
import UpdateModal from './actions/UpdateModal';
import DeleteModal from './actions/DeleteModal';

import { getFeatures } from 'src/store/features/featuresSlice';

import { Wrapper } from './Styles';

import theme from '../../global/theme';

const Features = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const features = useSelector(state => state.features);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [showCreateFeature, setShowCreateFeature] = useState(false);
  const [showUpdateFeature, setShowUpdateFeature] = useState(false);
  const [showDeleteFeature, setShowDeleteFeature] = useState(false);

  useEffect(() => {
    dispatch(getFeatures({ page, query }));
  }, [dispatch, page, query]);


  return (
    <Wrapper>
      <Breadcrumbs
        currentPage={t('pages.features.features')}
        pages={[{ name: `${t('pages.dashboard.dashboard')}`, path: '/' }]}
      />

      {features.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{features.error}</Text>
        </Alert>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2 }} justifyContent="space-between">
        <Flex marginBottom={8}>
          <Button bg="red.600" textTransform="uppercase"
            fontWeight="bold" fontSize={18} marginInlineEnd={4} color="white" _hover={{ bg: 'red.600' }}
            onClick={() => setShowCreateFeature(true)}
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

      {features.itemsCount > 0 ? (
        <FeaturesTable
          data={features.data}
          page={page}
          handleUpdate={(el) => setShowUpdateFeature(el)}
          handleDelete={(el) => setShowDeleteFeature(el)}
        />
      ) : (
        <Flex textAlign="center" bg={theme.light} boxShadow={theme.shadow} height={200} alignItems="center"
          justifyContent="center" borderRadius={16}>
          <Text fontSize={18} textTransform="capitalize" color="gray.300" fontWeight="bold">
            {t('pages.features.no_features')}
          </Text>
        </Flex>
      )}

      <Flex justifyContent="flex-end">
        <Pagination
          page={page}
          itemsCount={features.itemsCount ?? 0}
          onChange={(page) => setPage(page)}
        />
      </Flex>

      {showCreateFeature && <CreateModal onClose={() => setShowCreateFeature(false)} />}
      {showUpdateFeature && <UpdateModal data={showUpdateFeature} onClose={() => setShowUpdateFeature(false)} />}
      {showDeleteFeature && <DeleteModal data={showDeleteFeature} onClose={() => setShowDeleteFeature(false)} />}
    </Wrapper>
  )
}

export default Features