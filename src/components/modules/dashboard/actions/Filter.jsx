import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Stack, Text, Button } from '@chakra-ui/react';

import FilterModal from '../../../shared/modal/FilterModal';

import theme from '../../../global/theme';

const Filter = ({ handleFilter, handleClearFilter }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <FilterModal>
      <form onSubmit={handleSubmit(values => {
        handleFilter(values);
      })}>

        <Stack spacing={6}>
          <FormControl>

            <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
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
            <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
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

        <Button type="submit" mt={8} width="100%" colorScheme="blue">{t('general.save')}</Button>
        <Button type="button" mt={2} width="100%" colorScheme="red"
          onClick={handleClearFilter}
        >{t('general.reset')}</Button>

      </form>
    </FilterModal>
  )
}

export default Filter