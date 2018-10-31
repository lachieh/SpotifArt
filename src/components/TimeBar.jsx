import React from 'react';
import PropTypes from 'prop-types';

const TimeBar = props => {
  const { current, total } = props;
  return (
    <div>
      <input
        type="range"
        name="time"
        id="time"
        value={current}
        max={total}
        readOnly
      />
    </div>
  );
};

TimeBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default TimeBar;
