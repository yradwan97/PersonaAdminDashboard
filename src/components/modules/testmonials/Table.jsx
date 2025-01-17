import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
import * as FiIcons from 'react-icons/fi';

import Table from '../../shared/table/Table';

const GTable = ({ data, page, handleUpdate, handleDelete }) => {
  const { t } = useTranslation();
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('pages.testmonials.title_ar')}</th>
          <th>{t('pages.testmonials.title_en')}</th>
          <th>{t('general.action')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, index) => (
          <tr key={el._id}>
            <td>{((page - 1) * 10) + (index + 1)}</td>
            <td>{el.title_ar?.slice(0, 10)}</td>
            <td>{el.title_en?.slice(0, 10)}</td>
            <td>
              <Button
                bg="transparent" color="green" size="xs"
                onClick={() => handleUpdate(el)}
              >
                <FiIcons.FiEdit size={20} />
              </Button>

              <Button
                bg="transparent" color="red.600" size="xs"
                onClick={() => handleDelete(el)}
              >
                <FiIcons.FiDelete size={20} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default GTable