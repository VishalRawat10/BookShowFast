import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, id, error, icon, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-primary mb-1"
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative">
          {/* Optional Left Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              {icon}
            </div>
          )}

          {/* Actual Input */}
          <input
            id={id}
            ref={ref}
            className={`w-full pr-4 py-2.5 bg-card border rounded-default text-text-primary text-sm focus:outline-none focus:ring-2 transition-colors ${
              icon ? "pl-10" : "pl-4" // Adjust padding if icon is present
            } ${
              error
                ? "border-error-500 focus:ring-error-100 focus:border-error-500"
                : "border-border focus:ring-primary-200 focus:border-primary-500"
            }`}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-error-600 text-xs mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
