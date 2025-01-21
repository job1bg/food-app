const Button: React.FC<
  {
    children?: React.ReactNode;
    textOnly?: boolean;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, textOnly, className, ...props }) => {
  const cssClasses = textOnly
    ? `text-button ${className || ""}`
    : `button ${className || ""}`;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
