"use client";

import {useFormInput} from "@/hooks/useFormInput";
import {NumberInput} from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function Check2fa({mutation, buttonText}) {
  const {formData: otpRequestDTO, handleChange} = useFormInput({
    otp: ""
  })

  const handleSubmit = (e) => {
    console.log(otpRequestDTO);
    e.preventDefault();
    mutation.mutate({
      data: otpRequestDTO,
    })
  }

  return(
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <NumberInput name="otp" value={otpRequestDTO.otp} onChange={handleChange}  maxLength={6} placeholder="인증번호 6자리"/>
      <Button variant="primary" className="max-w-[120px]" type="submit" disabled={otpRequestDTO.otp.length < 6}>{buttonText}</Button>
    </form>
  )
}