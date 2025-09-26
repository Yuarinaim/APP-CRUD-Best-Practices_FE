import React from "react";

interface FormCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6
        border border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
