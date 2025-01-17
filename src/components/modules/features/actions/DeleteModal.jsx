import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  useToast
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { deleteFeature } from '../../../../store/features/featuresSlice';

import theme from '../../../global/theme';

const DeleteModal = ({ data, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const features = useSelector(state => state.features);
  const toast = useToast({ position: "top", status: "success", duration: 3000 });

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={20} padding={4} bg={theme.dark}>
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(deleteFeature(data))
            .unwrap()
            .then(_ => {
              toast({ description: "item deleted" });
              onClose();
            }).catch(_ => {
              onClose();
            });
        }}>
          <ModalHeader textAlign="center" color="orange" textTransform="uppercase" fontSize={22}>
            {t('general.delete')}
          </ModalHeader>
          <ModalBody>
            <Flex alignItems="center" justifyContent="center">
              <Text color="red" marginEnd={4}>
                <FiIcons.FiAlertTriangle size={24} />
              </Text>
              <Text as="h3" textTransform="capitalize" fontWeight="semibold" color="white">
                {t('general.delete_item')}
              </Text>
            </Flex>
          </ModalBody>

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
        </form>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal