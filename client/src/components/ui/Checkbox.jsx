import React, { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ label, id, error, className = "", ...props }, ref) => {
    return (
      <div className={`pt-2 ${className}`}>
        <label htmlFor={id} className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className={`mt-0.5 w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer ${
              error ? "border-error-500 focus:ring-error-100" : ""
            }`}
            {...props}
          />
          {label && (
            <span className="ml-2 text-sm text-text-secondary leading-snug">
              {label}
            </span>
          )}
        </label>
        {/* Error Message */}
        {error && (
          <p className="text-error-600 text-xs mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
