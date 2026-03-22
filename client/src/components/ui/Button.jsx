import React from "react";

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  isLoading = false,
  disabled,
  ...props
}) => {
  // Base styles applied to all buttons
  const baseStyles =
    "inline-flex items-center justify-center py-2.5 px-4 font-medium rounded-default transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";

  // Styles specific to the variant
  const variants = {
    primary:
      "bg-accent-500 hover:bg-accent-600 text-white shadow-sm focus:ring-accent-200",
    outline:
      "border border-border bg-card hover:bg-gray-50 text-text-primary focus:ring-primary-200",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || disabled} // Disable button if loading
      {...props}
    >
      {/* Loading Spinner SVG */}
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
