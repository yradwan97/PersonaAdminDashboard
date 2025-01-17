import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../../../utilities/crypto';


import {
  Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalBody, ModalFooter,
  Button, Text,
  Flex, FormControl,
  FormLabel, Input,
  Stack,
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';
import theme from '../../global/theme';


const PrintModal = ({ onClose, path }) => {
  const navigae = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();


  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={20} paddingBlock={4} bg={theme.dark}>
        <form onSubmit={handleSubmit(values => {
          const encryptedDate = encryptData({ from: values.from, to: values.to });
          navigae(`${path}?filter=${encryptedDate}`);
        })}>

          <ModalHeader textAlign="center" color="orange" textTransform="uppercase">
            {t('general.printout')}
          </ModalHeader>

          <ModalBody>
            <Stack spacing={6}>
              <FormControl>

                <FormLabel fontWeight="bold" textTransform="capitalize" color={theme.light}>
                  {t('general.from')}
                </FormLabel>
                <Input type="date" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('general.from')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("from", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.from?.message &&
                  <Text color="red.600" marginTop={2}>{errors.from.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color={theme.light}>
                  {t('general.to')}
                </FormLabel>
                <Input type="date" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('general.to')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("to", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.to?.message &&
                  <Text color="red.600" marginTop={2}>{errors.to.message}</Text>}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                rightIcon={<FiIcons.FiPrinter />}
                color={theme.light} bg={theme.success} paddingInline={4}
                paddingBlock={2} height="auto" textTransform="capitalize"
                _hover={{ background: theme.success }}
              >
                {t('general.printout')}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PrintModal