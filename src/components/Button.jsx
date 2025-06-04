// src/components/Button.jsx
import React from 'react';

function Button({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
export default Button;
