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
  useToast,
  Image
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { updateTestmonial } from '../../../../store/testmonials/testmonialsSlice';

import theme from '../../../global/theme';
import { baseUrl } from "src/utilities/axios";

const UpdateModal = ({ data, onClose }) => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", duration: 3000, status: "success" });
  const testmonials = useSelector(state => state.testmonials);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: data
  });

  watch(["image"]);

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius={20} paddingBlock={4} bg={theme.dark}>
        <form onSubmit={handleSubmit((values, event) => {
          dispatch(updateTestmonial({ values: event.target, _id: data._id }))
            .unwrap()
            .then(res => {
              toast({ description: "item updated" });
              onClose();
            }).catch(e => {
              console.log(e);
            })
        })}>
          <ModalHeader textAlign="center" color="orange" textTransform="uppercase" fontSize={22}>
            {t('general.update')}
          </ModalHeader>
          <ModalBody>

            {testmonials.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{testmonials.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.testmonials.title_ar')}
                </FormLabel>
                <Input type="text" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.testmonials.title_ar')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title_ar", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.title_ar?.message &&
                  <Text color="red.600" marginTop={2}>{errors.title_ar.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.testmonials.title_en')}
                </FormLabel>
                <Input type="text" bg={theme.bg} color={theme.dark} border="none" borderRadius={4}
                  placeholder={t('pages.testmonials.title_en')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title_en", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.title_en?.message &&
                  <Text color="red.600" marginTop={2}>{errors.title_en.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('pages.testmonials.image')}
                </FormLabel>
                <Input
                  type="file" placeholder={t("pages.testmonials.image")}
                  height="48px" borderRadius={4} pt={2} color="white"
                  {...register("image")}
                />
                {typeof (getValues("image")) === "string" && getValues("image") && (
                  <>
                    <input type="hidden" name="image" value={getValues("image")} />
                    <Image mt={2} src={`${baseUrl}/testmonials/${getValues("image")}`} height="150px" objectFit="contain" />
                    <Button mt={2} bg="red.600" color="white" type="button" onClick={() => setValue("image", null)}>
                      {t("general.delete")}
                    </Button>
                  </>
                )}
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
                isLoading={testmonials.isLoading}
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
                isLoading={testmonials.isLoading}
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

export default UpdateModal