import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import {
  Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalFooter, ModalBody,
  Button, FormControl,
  FormLabel, Input,
  Flex, Text,
  Alert,
  AlertIcon,
  Stack,
  useToast
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { createUser } from '../../../../store/users/usersSlice';

import theme from '../../../global/theme';

const CreateModal = ({ onClose }) => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", duration: 3000, status: "success" });
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius={20} paddingBlock={4} bg={theme.dark}>
        <form onSubmit={handleSubmit(values => {
          dispatch(createUser(values))
            .unwrap()
            .then(res => {
              toast({ description: "item created" });
              onClose();
            }).catch(e => {
              console.log(e);
            })
        })}>
          <ModalHeader textAlign="center" color="orange" textTransform="uppercase" fontSize={22}>
            {t('general.create')}
          </ModalHeader>
          <ModalBody>

            {users.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{users.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.users.name')}
                </FormLabel>
                <Input type="text" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.users.name')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("name", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.name?.message &&
                  <Text color="red.600" marginTop={2}>{errors.name.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.users.email')}
                </FormLabel>
                <Input type="email" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.users.email')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("email", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.email?.message &&
                  <Text color="red.600" marginTop={2}>{errors.email.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.users.phone')}
                </FormLabel>
                <Input type="tel" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.users.phone')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("phone", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.phone?.message &&
                  <Text color="red.600" marginTop={2}>{errors.phone.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.users.password')}
                </FormLabel>
                <Input type="password" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.users.password')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("password", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.password?.message &&
                  <Text color="red.600" marginTop={2}>{errors.password.message}</Text>}
              </FormControl>
            </Stack>
          </ModalBody >
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                rightIcon={<FiIcons.FiSave />}
                color="white" bg="green" paddingInline={4}
                paddingBlock={2} height="auto" textTransform="capitalize"
                isLoading={users.isLoading}
                _hover={{ background: 'green' }}
              >
                {t('general.save')}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                rightIcon={<FiIcons.FiMinimize2 />}
                color="white" bg="red.600" paddingInline={4}
                paddingBlock={2} height="auto" textTransform="capitalize"
                marginInlineStart={4}
                isLoading={users.isLoading}
                _hover={{ background: 'red.600' }}
              >
                {t('general.close')}
              </Button>
            </Flex>
          </ModalFooter>
        </form >
      </ModalContent >
    </Modal >
  )
}

export default CreateModal