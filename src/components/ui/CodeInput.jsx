import React, { useState, useRef, useEffect } from 'react';
import '../../css/ui/CodeInput.css';

const SecurityCodeInput = ({ length = 4, onChange }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the code array
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take the last character
    setCode(newCode);
    
    // Call the onChange callback with the complete code
    if (onChange) {
      onChange(newCode.join(''));
    }
    
    // Auto-focus next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is all digits and correct length
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, length).split('');
    const newCode = [...code];
    
    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit;
      }
    });
    
    setCode(newCode);
    
    if (onChange) {
      onChange(newCode.join(''));
    }
    
    // Focus the last filled input or the next empty one
    const lastIndex = Math.min(digits.length, length - 1);
    inputRefs.current[lastIndex].focus();
  };

  return (
    <div className="security-code-input">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          aria-label={`Digit ${index + 1}`}
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export default SecurityCodeInput;