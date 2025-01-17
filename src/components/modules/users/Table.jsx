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
          <th>{t('pages.users.name')}</th>
          <th>{t('pages.users.email')}</th>
          <th>{t('pages.users.phone')}</th>
          <th>{t('general.action')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, index) => (
          <tr key={el._id}>
            <td>{((page - 1) * 10) + (index + 1)}</td>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.phone}</td>
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