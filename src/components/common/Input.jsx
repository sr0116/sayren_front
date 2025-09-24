"use client";

import {Check, Circle, CircleCheck, Eye, EyeOff} from "lucide-react";
import {useState} from "react";

export function TextInput({value, onChange, placeholder, name, autoComplete, type = "text"}) {
  return (
    <div className="flex flex-col w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring focus:ring-gray-900
                   placeholder:text-gray-500"
      />
    </div>
  );
}

export function PasswordInput({value, onChange, placeholder, name}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-full relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring focus:ring-gray-900
                   placeholder:text-gray-500"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {show ? <Eye size={18}/> : <EyeOff size={18}/>}
      </button>
    </div>
  );
}

export function NumberInput({ name, value, onChange, maxLength, placeholder, disabled=false }) {
  const handleChange = (e) => {
    // 숫자만 허용
    const onlyNumber = e.target.value.replace(/\D/g, "");

    // 길이 제한
    const limited = maxLength ? onlyNumber.slice(0, maxLength) : onlyNumber;

    if (onChange) {
      // 부모에게 이벤트 형식 그대로 전달
      onChange({
        ...e,
        target: {
          ...e.target,
          name,
          value: limited,
        },
      });
    }
  };

  return (
      <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full h-full max-h-[48px] border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring focus:ring-gray-900
                   placeholder:text-gray-500"
          maxLength={maxLength}
          disabled={disabled}
      />
  );
}



export function CheckBox({label, onChange, name, checked}) {


  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-gray-500 text-sm">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {checked ? (
        <Check className="w-4 h-4 text-white bg-gray-900 rounded-full" strokeWidth={3}/>
      ) : (
        <Circle className="w-4 h-4 text-gray-400"/>
      )}
      {label}
    </label>
  );
}

