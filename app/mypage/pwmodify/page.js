import ChangePwForm from "@/components/member/ChangePwForm";
import OtpOrPasswordCheckForm from "@/components/member/OtpOrPasswordCheckForm";

export default function PwModifyPage(){
  return (
    <div>
      <OtpOrPasswordCheckForm>
        <ChangePwForm buttonText={"비밀번호 변경"}/>
      </OtpOrPasswordCheckForm>
    </div>
    )
}