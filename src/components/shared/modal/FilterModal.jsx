import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';
import theme from '../../global/theme';

const Filter = ({ children }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button bg={theme.error} textTransform="uppercase" borderRadius={4}
        marginInlineStart={4} color={theme.light} _hover={{ background: theme.error }}
        onClick={onOpen}
      >
        <Text marginInlineEnd={2}>{t('general.filter')}</Text>
        <FiIcons.FiFilter size={16} />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="end"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={theme.dark}>
          <DrawerHeader color={theme.light} display="flex" alignItems="center"
            justifyContent="space-between" mb={4}
          >
            <Text marginInlineEnd={2} textTransform="capitalize" fontSize={20}>{t('general.filter')}</Text>
            <Button onClick={onClose} type="button" color="red" bg="ransparent" _hover={{ background: "ransparent" }}>
              <FiIcons.FiDelete size={24} />
            </Button>
          </DrawerHeader>

          <DrawerBody>
            {children}
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Filter