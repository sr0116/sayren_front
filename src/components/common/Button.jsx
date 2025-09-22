"use client";

export default function Button({
                                 children,
                                 variant = "primary",
                                 type = "submit",
                                 onClick,
                                 className = "",
                                 disabled = false,
                               }) {
  const base =
      "w-full py-3 rounded-md font-semibold transition focus:outline-none disabled:bg-gray-300 cursor-pointer";

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-700", // 메인 버튼
    outline:
        "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white", // 테두리 버튼
    secondary: "bg-gray-500 text-white hover:bg-gray-700", // 보조 버튼
  };

  return (
      <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
  );
}
