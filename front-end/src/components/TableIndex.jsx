import PropTypes from 'prop-types';
import React from 'react';

export default function TableIndex({ index }) {
  return (
    <tr>
      { index.map((item, i) => (<th key={ i }>{item}</th>)) }
    </tr>
  );
}

TableIndex.propTypes = {
  index: PropTypes.arrayOf(PropTypes.string).isRequired,
};
