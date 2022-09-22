import PropTypes from 'prop-types';
import React from 'react';

export default function StatusCard({ status, dataTestId }) {
  return (
    <div className="status-card">
      <p
        className="status"
        data-testid={ dataTestId }
      >
        { status }
      </p>
    </div>
  );
}

StatusCard.propTypes = {
  status: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
