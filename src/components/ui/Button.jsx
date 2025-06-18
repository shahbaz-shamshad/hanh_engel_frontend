import React from "react";
import "../../css/ui/Button.css";

const Button = ({
  variant = "primary",
  text,
  onClick,
  className,
  type = "button",
  ...props
}) => {
  const buttonClassName = `button button--${variant} ${className || ""}`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
