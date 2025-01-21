import { InputHTMLAttributes } from "react";

const Input: React.FC<
  {
    label: string;
    id: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, id, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;
