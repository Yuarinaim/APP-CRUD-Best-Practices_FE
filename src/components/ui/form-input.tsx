import React, { useState } from "react";
import { FieldError, UseFormRegister, Control, Controller } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options?: { value: string; label: string }[]; // Para select
}

// Componentes de iconos para el ojo
const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.122 3.122M12 12l3.122-3.122m0 0L21 21"
    />
  </svg>
);

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  control,
  error,
  required = false,
  disabled = false,
  className = "",
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputClassName = `
    w-full px-3 border rounded-md shadow-sm
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    disabled:bg-surface-tertiary disabled:cursor-not-allowed
    bg-surface-primary border-border-primary text-text-primary
    placeholder-text-tertiary
    ${isPasswordField ? "py-2 pr-10" : "py-2"}
    ${error ? "border-error focus:ring-error focus:border-error" : "border-border-primary"}
  `;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Si se proporciona control, usar Controller
  if (control) {
    return (
      <div className={`space-y-2 ${className}`}>
        <label htmlFor={name} className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            // Si es un select
            if (type === "select" && options) {
              return (
                <select {...field} id={name} disabled={disabled} className={inputClassName}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
            }

            // Para inputs normales
            if (isPasswordField) {
              return (
                <div className="relative">
                  <input
                    {...field}
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary"
                    disabled={disabled}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              );
            }

            return (
              <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClassName}
              />
            );
          }}
        />

        {error && <p className="text-sm text-error">{error.message}</p>}
      </div>
    );
  }

  // Si se proporciona register, usar el método tradicional
  if (register) {
    return (
      <div className={`space-y-2 ${className}`}>
        <label htmlFor={name} className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>

        {type === "select" && options ? (
          <select id={name} disabled={disabled} className={inputClassName} {...register(name)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : isPasswordField ? (
          <div className="relative">
            <input
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              className={inputClassName}
              {...register(name)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary"
              disabled={disabled}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            {...register(name)}
          />
        )}

        {error && <p className="text-sm text-error">{error.message}</p>}
      </div>
    );
  }

  // Fallback: input sin validación
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {isPasswordField ? (
        <div className="relative">
          <input
            id={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary"
            disabled={disabled}
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
        />
      )}
      {error && <p className="text-sm text-error">{error.message}</p>}
    </div>
  );
};
