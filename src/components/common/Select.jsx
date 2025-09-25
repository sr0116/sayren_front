"use client";

export default function Select({ children, name, value, onChange, disabled=false }) {
  return (
      <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring focus:ring-gray-900
                   placeholder:text-gray-500 h-full max-h-[48px]"
          disabled={disabled}
      >
        {children}
      </select>
  );
}
