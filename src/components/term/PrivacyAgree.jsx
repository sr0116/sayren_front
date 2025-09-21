import {CheckBox} from "@/components/common/Input";
import React from "react";

export default function PrivacyAgree({ onChange , checked , size , name }) {
  return (
    <div className="space-y-2">
      <CheckBox onChange={onChange} checked={checked} name={name} label={
        <span className="text-sm font-semibold text-gray-800">
              <span className="text-primary">[필수]</span> 개인정보 처리방침
            </span>
      }/>
      <div className={`border rounded-md bg-gray-50 max-h-36 overflow-y-auto text-gray-600 leading-relaxed p-3 ${"text-" + size}`}>
        <p className="font-bold">세이렌(SAYREN) 개인정보처리방침</p>
        <p>
          세이렌 주식회사(이하 "회사")는 「개인정보 보호법」 제30조에 따라 이용자의
          개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
          다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>
        <br/>
        <p className="font-semibold">1. 개인정보의 처리 목적</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>
            회원가입 및 관리: 회원 가입의사 확인, 본인 식별·인증, 계정 관리, 서비스
            부정이용 방지, 고지·통지 및 민원처리
          </li>
          <li>렌탈 신청 및 서비스 제공: 제품 배송, 설치, 요금 결제 및 정산, A/S 처리</li>
          <li>마케팅 및 광고: 이벤트 및 광고성 정보 제공, 서비스 이용 통계</li>
        </ul>
        <br/>
        <p className="font-semibold">2. 개인정보의 처리 및 보유 기간</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>회원가입 및 관리: 회원 탈퇴 시까지</li>
          <li>렌탈 신청 및 서비스 제공: 서비스 공급 완료 및 요금 결제·정산 시까지</li>
          <li>
            관계 법령에 따라 일정 기간 보존할 필요가 있는 경우: 계약·결제 기록 5년,
            소비자 불만 및 분쟁처리 기록 3년, 표시·광고에 관한 기록 6개월, 서비스 접속
            기록 3개월
          </li>
        </ul>
        <br/>
        <p className="font-semibold">3. 처리하는 개인정보의 항목 및 수집 방법</p>
        <p>
          필수항목: 이름, 이메일, 휴대전화, 주소, 결제정보
          선택항목: 생년월일, 성별
          수집 방법: 홈페이지, 앱, 전화, 이메일, 배송 요청 시
        </p>
        <br/>
        <p className="font-semibold">4. 만 14세 미만 아동의 개인정보 처리</p>
        <p>
          회사는 만 14세 미만 아동의 회원가입 시 법정대리인의 동의를 받고 최소한의
          정보만 수집합니다.
        </p>
        <br/>
        <p className="font-semibold">5. 개인정보의 제3자 제공</p>
        <p>
          회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에
          따라 필요한 경우에 한해 제공할 수 있습니다.
        </p>
        <br/>
        <p className="font-semibold">6. 개인정보 처리 위탁</p>
        <p>
          회사는 원활한 서비스 제공을 위하여 결제대행사(PG사), 배송업체 등 외부 전문업체에
          개인정보 처리를 위탁할 수 있으며, 관련 법령에 따른 안전조치를 취합니다.
        </p>
        <br/>
        <p className="font-semibold">7. 개인정보의 파기</p>
        <p>
          개인정보 보유기간 경과, 처리 목적 달성 등 불필요해진 경우 지체 없이 파기합니다.
          전자적 파일은 복구 불가능한 기술적 방법으로, 종이 문서는 분쇄 또는 소각하여
          파기합니다.
        </p>
        <br/>
        <p className="font-semibold">8. 정보주체의 권리·의무</p>
        <p>
          이용자는 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있으며,
          법정대리인을 통한 행사도 가능합니다.
        </p>
        <br/>
        <p className="font-semibold">9. 개인정보의 안전성 확보조치</p>
        <p>
          회사는 개인정보 보호를 위해 내부 관리계획 수립, 접근통제, 암호화, 보안프로그램
          설치, 물리적 접근 통제 등의 조치를 취하고 있습니다.
        </p>
        <br/>
        <p className="font-semibold">10. 개인정보 자동수집 장치의 설치·운영</p>
        <p>
          회사는 맞춤형 서비스 제공을 위해 쿠키를 사용할 수 있으며, 이용자는 웹 브라우저
          설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>
        <br/>
        <p className="font-semibold">11. 개인정보 보호책임자</p>
        <p>
          개인정보 보호책임자 및 담당자를 지정하여 개인정보 관련 문의, 불만, 피해구제 요청을
          처리합니다.
          책임자: OOO / 연락처: OO-OOOO-OOOO / 이메일: example@sayren.com
        </p>
        <br/>
        <p className="font-semibold">12. 권익침해 구제방법</p>
        <p>
          개인정보 침해 관련 분쟁 해결이나 상담은 개인정보분쟁조정위원회(1833-6972),
          개인정보침해신고센터(118), 대검찰청(1301), 경찰청(182) 등에 신청할 수 있습니다.
        </p>
        <br/>
        <p className="font-semibold">13. 개인정보처리방침 변경</p>
        <p>
          법령, 정책 변경에 따라 본 방침이 수정될 수 있으며, 변경 시 시행일자를 명시하여
          공지합니다.
        </p>
      </div>
    </div>
  )
}