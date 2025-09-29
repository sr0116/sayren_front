import SocialAccount from "@/components/member/SocialAccount";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import OtpOrPasswordCheckForm from "@/components/member/OtpOrPasswordCheckForm";

export default function SocialPage(){
  return (
    <div>
      <SocialAuthHandler/>
      <OtpOrPasswordCheckForm>
      <SocialAccount />
      </OtpOrPasswordCheckForm>
    </div>
  )
}