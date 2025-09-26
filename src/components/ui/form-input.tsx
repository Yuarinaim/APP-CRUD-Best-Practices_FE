import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-surface-tertiary disabled:cursor-not-allowed
          bg-surface-primary border-border-primary text-text-primary
          placeholder-text-tertiary
          ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-border-primary"
          }
        `}
        {...register(name)}
      />
      {error && <p className="text-sm text-error">{error.message}</p>}
    </div>
  );
};
