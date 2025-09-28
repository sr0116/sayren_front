import PasswordCheckForm from "@/components/member/PasswordCheckForm";
import Member2FARead from "@/components/member/Member2FARead";

export default function Member2FAPage(){
  return (
    <div>
      <PasswordCheckForm>
        <Member2FARead/>
      </PasswordCheckForm>
    </div>
  )
}