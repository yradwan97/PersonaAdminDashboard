import { useTranslation } from 'react-i18next';
import { Text, Flex } from '@chakra-ui/react';

import Statistics from "./components/statistics/Statistics";

import Filter from './actions/Filter';

import { DashboardWrapper } from "./DashboardStyle";
import theme from '../../global/theme';


const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <DashboardWrapper>

      <Flex paddingBlock={8} justifyContent="space-between" alignItems="center">
        <Text
          fontWeight="bold" textTransform="capitalize"
          fontSize={16} color={theme.dark}
        >
          {t('pages.dashboard.general_report')}
        </Text>
        <Filter
          handleFilter={(values) => console.log(values)}
          handleClearFilter={() => console.log("")}
        />
      </Flex>

      <Statistics />

    </DashboardWrapper>
  )
}

export default Dashboard