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

import { createFeature } from '../../../../store/features/featuresSlice';

import theme from '../../../global/theme';

const CreateModal = ({ onClose }) => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", duration: 3000, status: "success" });
  const features = useSelector(state => state.features);

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
        <form onSubmit={handleSubmit((values, event) => {
          dispatch(createFeature(event.target))
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

            {features.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{features.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.features.title_ar')}
                </FormLabel>
                <Input type="text" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.features.title_ar')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title_ar", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.title_ar?.message &&
                  <Text color="red.600" marginTop={2}>{errors.title_ar.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.features.title_en')}
                </FormLabel>
                <Input type="text" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.features.title_en')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title_en", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.title_en?.message &&
                  <Text color="red.600" marginTop={2}>{errors.title_en.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.features.image')}
                </FormLabel>
                <Input type="file" pt={1} bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.features.image')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("image", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.image?.message &&
                  <Text color="red.600" marginTop={2}>{errors.date.message}</Text>}
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
                isLoading={features.isLoading}
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
                isLoading={features.isLoading}
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