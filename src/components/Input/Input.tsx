import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IProps {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  autoComplte?: string;
}

const Input = (props: IProps) => {
  const {
    type,
    errorMessage,
    placeholder,
    className,
    name,
    register,
    rules,
    autoComplte,
  } = props;
  return (
    <div className={className}>
      <input
        type={type}
        className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
        placeholder={placeholder}
        autoComplete={autoComplte}
        {...register(name, rules)}
      />
      <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
        {errorMessage}
      </div>
    </div>
  );
};

export default Input;
