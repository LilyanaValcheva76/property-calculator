import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  type = "number",
  step = "any",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      step={step}
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-white/20 ${className}`}
      {...props}
    />
  );
}

