import * as React from "react";

export function Button({ children, variant = "primary", onClick }) {
  const baseStyles = "flex gap-2 justify-center items-center px-3 py-2.5 leading-none uppercase rounded-sm border border-solid";
  const variants = {
    primary: "bg-zinc-900 border-zinc-800 shadow-[0px_1px_30px_rgba(0,0,0,0.25)]",
    secondary: "bg-rose-600 bg-opacity-40 border-rose-600"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      tabIndex={0}
    >
      {children}
    </button>
  );
}