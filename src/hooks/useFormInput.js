import { useState } from "react";

export function useFormInput(initialState = {}) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return { formData, setFormData, handleChange };
}