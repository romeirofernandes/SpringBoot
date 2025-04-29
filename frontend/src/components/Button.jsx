import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles = "px-4 py-2 rounded font-semibold transition-colors";

  const variantStyles = {
    primary: "bg-[#e10600] text-white hover:bg-[#c10600] disabled:bg-gray-400",
    secondary:
      "bg-[#0090d0] text-white hover:bg-[#0070a0] disabled:bg-gray-400",
    outline:
      "border border-[#e10600] text-[#e10600] hover:bg-[#e10600] hover:text-white disabled:border-gray-400 disabled:text-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
