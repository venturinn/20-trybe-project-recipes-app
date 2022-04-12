import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    className,
    label,
    id, name,
    testId,
    value,
    type,
    onChange,
    onClick,
    src,
    placeholder,
  } = props;

  return (
    <label htmlFor={ id } className={ className }>
      {label}
      <input
        className={ className }
        id={ id }
        autoComplete="off"
        type={ type }
        placeholder={ placeholder }
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
  placeholder: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
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
  className: null,
  placeholder: null,
};

export default Input;
