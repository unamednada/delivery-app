import PropTypes from 'prop-types';
import React from 'react';

export default function TextCard({ text, className, dataTestId }) {
  return (
    <div className="text-card">
      <p
        className={ className }
        data-testid={ dataTestId }
      >
        { text }
      </p>
    </div>
  );
}

TextCard.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
