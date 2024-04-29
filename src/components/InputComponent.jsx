import React, { useRef } from "react";

const InputComponent = ({ label, value, onChange, step }) => {
  const inputRef = useRef(null);

  const handleChange = () => {
    const newValue = inputRef.current.value;
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = parseFloat(inputRef.current.value) + step;
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = parseFloat(inputRef.current.value) - step;
    onChange(newValue);
  };

  return (
    <div className="input__container">
      <div className="input__label__container">
        <div className="input__label">
          <label className="mb-2" htmlFor={label}>
            {label}
          </label>
        </div>
      </div>
      <div className="input__field__container">
        <div className="input__field__button__container">
          <button
            className="input__field__button text-base w-3"
            onClick={handleDecrement}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="minus"
              className="svg-inline--fa fa-minus fa-xs"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#02295D" // Cambia el color aquí
                d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="input__field">
          <input
            type="number"
            value={value}
            onChange={handleChange}
            ref={inputRef}
            min={0}
          />
        </div>
        <div className="input__field__button__container">
          <button
            className="input__field__button text-base w-3"
            onClick={handleIncrement}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              className="svg-inline--fa fa-plus fa-xs"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#02295D" // Cambia el color aquí
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
