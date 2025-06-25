import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, type = "text", ...props }, ref) => {
    const [hasValue, setHasValue] = React.useState(!!props.value);
    const [focused, setFocused] = React.useState(false);

    const isFloating = focused || hasValue;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={type}
          className={cn(
            "peer block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 top-2 text-sm text-gray-400 transition-all",
            isFloating ? "text-xs top-1" : "text-sm top-3.5"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
