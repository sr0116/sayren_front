import MemberDetail from "@/components/admin/member/MemberDetail";

export default function MemberDetailPage({params}){
  const {memberId} = params;


  return (
      <div>
        <MemberDetail memberId={memberId}/>
      </div>
  )
}