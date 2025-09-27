import SocialAccount from "@/components/member/SocialAccount";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";

export default function SocialPage(){
  return (
    <div>
      <SocialAuthHandler/>
      <SocialAccount />
    </div>
  )
}