import PropTypes from 'prop-types';
import React from 'react';

export default function Button(
  { name, handleClick, dataTestId, className, disabled, type, price },
) {
  return (
    <button
      type={ type === 'button' ? 'button' : 'submit' }
      name={ name }
      data-testid={ dataTestId }
      onClick={ handleClick }
      className={ className }
      disabled={ disabled }
    >
      { name }
      { price }
    </button>
  );
}

Button.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  price: PropTypes.element,
};

Button.defaultProps = {
  disabled: false,
  price: null,
};
