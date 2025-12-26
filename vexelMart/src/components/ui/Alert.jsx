import React from "react";
import clsx from "clsx";

export function Alert({ variant = "default", className = "", children }) {
  const base =
    "relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start";

  const variants = {
    default: "bg-gray-50 text-gray-900 border-gray-200",
    destructive: "bg-red-50 text-red-700 border-red-300",
  };

  return (
    <div
      role="alert"
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "" }) {
  return (
    <h5 className={clsx("font-semibold leading-none", className)}>
      {children}
    </h5>
  );
}

export function AlertDescription({ children, className = "" }) {
  return (
    <div className={clsx("text-sm text-gray-600 mt-1", className)}>
      {children}
    </div>
  );
}
