import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { label, id, name, testId, value, type, onChange } = props;
  return (
    <label htmlFor={ id }>
      {label}
      <input
        id={ id }
        type={ type }
        name={ name }
        value={ value }
        data-testid={ testId }
        onChange={ onChange }
        type={ type }
      />
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  testId: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  testId: '',
  type: 'text',
};

export default Input;
