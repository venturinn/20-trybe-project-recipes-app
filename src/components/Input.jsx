import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { label, id, name, testId, value, type, onChange, onClick, src } = props;

  return (
    <label htmlFor={ id }>
      {label}
      <input
        id={ id }
        type={ type }
        name={ name }
        value={ value || '' }
        data-testid={ testId }
        onChange={ onChange }
        onClick={ onClick }
        src={ src }
      />
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string,
  src: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  testId: null,
  type: 'text',
  id: null,
  name: null,
  onChange: null,
  onClick: null,
  src: null,
  value: '',
};

export default Input;
