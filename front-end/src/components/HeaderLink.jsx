import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderLink({ name, user, path, dataTestId, className }) {
  return (
    <Link to={ `/${user}/${path}` } data-testid={ dataTestId } className={ className }>
      { name }
    </Link>
  );
}

HeaderLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
