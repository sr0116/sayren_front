import ChangePwForm from "@/components/member/ChangePwForm";
import PasswordCheckForm from "@/components/member/PasswordCheckForm";

export default function PwModifyPage(){
  return (
    <div>
      <PasswordCheckForm>
        <ChangePwForm buttonText={"비밀번호 변경"}/>
      </PasswordCheckForm>
    </div>
    )
}