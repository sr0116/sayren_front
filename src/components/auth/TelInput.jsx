"use client";

import {useFormInput} from "@/hooks/useFormInput";
import {NumberInput} from "@/components/common/Input";
import Select from "@/components/common/Select";
import {useEffect} from "react";

export default function TelInput({ name, value , onChange , disabled = false}) {
  // tel 합치기
  const {formData: telInput, handleChange} = useFormInput({
    first: value?.slice(0, 3) || "010",
    middle: value?.slice(3, 7) || "",
    last: value?.slice(7) || "",
  })

  useEffect(() => {
    const fullTel = `${telInput.first}${telInput.middle}${telInput.last}`;
    if (fullTel !== value) {
      onChange?.({
        target: { name, value: fullTel },
      });
    }
  }, [telInput, value, name, onChange]);



  return (
    <div className="flex gap-2 items-center flex-1">
      <Select name="first"
              value={telInput.first}
              onChange={handleChange}
              disabled={disabled}
      >
        <option value="010">010</option>
        <option value="011">011</option>
        <option value="016">016</option>
        <option value="017">017</option>
        <option value="018">018</option>
        <option value="019">019</option>
      </Select>
      <div>-</div>
      <NumberInput
          name="middle"
          placeholder="1234"
          value={telInput.middle}
          onChange={handleChange}
          maxLength={4}
          disabled={disabled}
      />
      <div>-</div>
      <NumberInput
          name="last"
          placeholder="5678"
          value={telInput.last}
          onChange={handleChange}
          maxLength={4}
          disabled={disabled}
      />
    </div>
  );
}
