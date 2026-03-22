import React, { useEffect } from "react";

export default function Notification({ message, type = "success", onClose }) {
  // Auto-dismiss the notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  const bgColor = isSuccess ? "bg-success-100" : "bg-error-100";
  const borderColor = isSuccess ? "border-success-500" : "border-error-500";
  const iconColor = isSuccess ? "text-success-600" : "text-error-600";

  return (
    <div
      className={`fixed top-10 right-5 z-50 flex w-full max-w-sm items-center p-4 border-l-4 shadow-lg rounded-default font-sans bg-card ${bgColor} ${borderColor} transition-all duration-300 ease-in-out ${
        !message ? "hidden" : ""
      }`}
    >
      {/* Status Icon */}
      <div className={`mr-3 ${iconColor}`}>
        {isSuccess ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      {/* Message Text */}
      <div className="flex-1 text-text-primary text-sm font-medium">
        {message}
      </div>

      {/* Cancel/Close Button */}
      <button
        onClick={onClose}
        className="ml-4 text-text-secondary hover:text-text-primary focus:outline-none transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
