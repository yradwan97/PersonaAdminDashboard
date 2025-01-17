import * as FiIcons from 'react-icons/fi';
import { SimpleGrid, Box, Text, Flex, } from '@chakra-ui/react';
import { DashboardWrapper } from "../../DashboardStyle";
import theme from '../../../../global/theme';

const Statistics = () => {
  return (
    <DashboardWrapper>
      <SimpleGrid columns={{ sm: 1, lg: 2, xl: 4 }} spacing={6}>

        <Flex boxShadow={theme.shadow} bg={theme.light} padding={6} alignItems="center" justifyContent="space-between">
          <Flex justifyContent="space-between">
            <Box color="#1C3FAA">
              <FiIcons.FiUserPlus size={40} />
            </Box>
          </Flex>
          <Box>
            <Text
              fontWeight="bold" fontSize={30} mt={4} color={theme.dark}
            >
              {1}
            </Text>
            <Text
              fontWeight="bold" fontSize={16} textTransform="capitalize" color={theme.dark}>
              users
            </Text>
          </Box>
        </Flex>

        <Flex boxShadow={theme.shadow} bg={theme.light} padding={6} alignItems="center" justifyContent="space-between">
          <Flex justifyContent="space-between">
            <Box color="#F78B00">
              <FiIcons.FiList size={40} />
            </Box>
          </Flex>
          <Box>
            <Text
              fontWeight="bold" fontSize={30} mt={4} color={theme.dark}
            >
              {0}
            </Text>
            <Text
              fontWeight="bold" fontSize={16} textTransform="capitalize" color={theme.dark}>
              features
            </Text>
          </Box>
        </Flex>

        <Flex boxShadow={theme.shadow} bg={theme.light} padding={6} alignItems="center" justifyContent="space-between">
          <Flex justifyContent="space-between">
            <Box color="#F44336">
              <FiIcons.FiAlertCircle size={50} />
            </Box>
          </Flex>
          <Box>
            <Text
              fontWeight="bold" fontSize={30} mt={4} color={theme.dark}
            >
              {0}
            </Text>
            <Text
              fontWeight="bold" fontSize={16} textTransform="capitalize" color={theme.dark}>
              alerts
            </Text>
          </Box>
        </Flex>

        <Flex boxShadow={theme.shadow} bg={theme.light} padding={6} alignItems="center" justifyContent="space-between">
          <Flex justifyContent="space-between">
            <Box color="#008A00">
              <FiIcons.FiUserPlus size={40} />
            </Box>
          </Flex>
          <Box>
            <Text
              fontWeight="bold" fontSize={30} mt={4} color={theme.dark}
            >
              {0}
            </Text>
            <Text
              fontWeight="bold" fontSize={16} textTransform="capitalize" color={theme.dark}>
              testmonials
            </Text>
          </Box>
        </Flex>

      </SimpleGrid>
    </DashboardWrapper>
  )
}

export default Statistics