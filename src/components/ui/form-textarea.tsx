import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          dark:placeholder-gray-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
          ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }
        `}
        {...register(name)}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error.message}</p>}
    </div>
  );
};
