import OtpOrPasswordCheckForm from "@/components/member/OtpOrPasswordCheckForm";
import DeleteMember from "@/components/member/DeleteMemberForm";

export default function DeleteUserPage(){
  return (
      <OtpOrPasswordCheckForm>
        <DeleteMember/>
      </OtpOrPasswordCheckForm>
  )
}