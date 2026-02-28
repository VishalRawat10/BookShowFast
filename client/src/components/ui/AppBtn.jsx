export default function AppBtn({
  children,
  className,
  variant,
  disabled = false,
  onClick,
  type = "submit",
}) {
  const variants = {
    primary: "",
    base: "",
    success: "",
    danger: "",
    outline: "",
  };

  return (
    <button
      type={type}
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
