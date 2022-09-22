import PropTypes from 'prop-types';
import React from 'react';
import { TableBody, TableIndex } from '../components';

export default function OrdersTable({ index, body, prefix }) {
  return (
    <table>
      <thead>
        <TableIndex index={ index } />
      </thead>
      <tbody>
        <TableBody body={ body } prefix={ prefix } />
      </tbody>
    </table>
  );
}

OrdersTable.propTypes = {
  index: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number, PropTypes.objectOf(PropTypes.number)],
      ),
    ),
  ).isRequired,
  prefix: PropTypes.string.isRequired,
};
