import Member2FARead from "@/components/member/Member2FARead";
import OtpOrPasswordCheckForm from "@/components/member/OtpOrPasswordCheckForm";

export default function Member2FAPage(){
  return (
    <div>
      <OtpOrPasswordCheckForm>
        <Member2FARead/>
      </OtpOrPasswordCheckForm>
    </div>
  )
}