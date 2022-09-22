import PropTypes from 'prop-types';
import React from 'react';

export default function TextInput(
  { className, labelText, type, name,
    value, placeholder, dataTestId, onChange },
) {
  return (
    <>
      <label htmlFor={ name }>
        { `${labelText} ` }
      </label>
      <input
        className={ className }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        id={ name }
        placeholder={ placeholder }
        data-testid={ dataTestId }
        min="0"
      />
    </>
  );
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  dataTestId: PropTypes.string,
};

TextInput.defaultProps = {
  labelText: '',
  placeholder: '',
  dataTestId: '',
};
