import PropTypes from 'prop-types';
import React from 'react';

export default function SelectInput(
  { className, labelText, name, value, options, onChange, dataTestId },
) {
  return (
    <>
      <label htmlFor={ name }>
        { `${labelText} ` }
      </label>
      <select
        className={ className }
        type="text"
        name={ name }
        value={ value }
        onChange={ onChange }
        id={ name }
        data-testid={ dataTestId }
      >
        {options.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

SelectInput.propTypes = {
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataTestId: PropTypes.string.isRequired,
};

SelectInput.defaultProps = {
  onChange: () => {},
};
