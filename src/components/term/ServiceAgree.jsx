import {CheckBox} from "@/components/common/Input";
import React from "react";

export default function ServiceAgree({ onChange , checked , size, name }) {
  return (
    <div className="space-y-2">
      <CheckBox onChange={onChange} checked={checked} name={name} label={
        <span className="text-sm font-semibold text-gray-800">
              <span className="text-primary">[필수]</span> 서비스 이용약관
            </span>
      }/>
      <div className={`border rounded-md bg-gray-50 max-h-36 overflow-y-auto text-gray-600 leading-relaxed p-3 ${"text-" + size}`} >
        <p className="font-bold">세이렌 서비스 이용약관</p>
        <p>
          세이렌 주식회사(이하 “회사”)가 제공하는 가전 렌탈 서비스(이하 “서비스”)를
          이용해 주셔서 감사합니다. 본 약관은 회사와 이용자 간의 권리·의무 및 서비스
          이용 조건을 규정합니다.
        </p>
        <br/>
        <p className="font-semibold">제1조 (회원가입 및 계정)</p>
        <p>
          이용자는 본 약관에 동의 후 회원가입을 신청할 수 있으며, 회사는 이메일 또는
          휴대폰 인증을 요구할 수 있습니다. 회사는 원칙적으로 신청을 승낙하되, 아래
          사유가 있는 경우 승낙을 거부하거나 사후에 이용계약을 해지할 수 있습니다.
        </p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>타인의 명의를 사용하거나 허위 정보를 기재한 경우</li>
          <li>만 14세 미만 아동이 법정대리인 동의 없이 신청한 경우</li>
          <li>기타 회사 정책·관련 법령을 위반한 경우</li>
        </ul>
        <br/>
        <p className="font-semibold">제2조 (렌탈 신청 및 이용)</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>이용자는 회사가 제공하는 절차에 따라 원하는 가전제품을 선택하고, 렌탈 신청을 할 수 있습니다.</li>
          <li>회사는 심사(신용정보 조회, 본인 확인 등)를 거쳐 승낙 여부를 결정하며, 승낙 시 렌탈 계약이 체결됩니다.</li>
          <li>렌탈 제품의 소유권은 회사에 있으며, 이용자는 계약 기간 동안 사용권만 가집니다.</li>
          <li>이용자는 정상적인 사용 범위를 벗어나 제품을 임의로 개조, 양도, 전대할 수 없습니다.</li>
        </ul>
        <br/>
        <p className="font-semibold">제3조 (요금 및 결제)</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>렌탈 요금은 계약 시점에 명시된 금액과 납부 방식(월 단위 자동결제 등)에 따릅니다.</li>
          <li>이용자는 지정된 결제수단(신용카드, 계좌이체 등)을 통해 정해진 기일에 요금을 납부하여야 합니다.</li>
          <li>결제일에 미납이 발생할 경우, 회사는 납부 요청을 할 수 있으며 일정 기간 이상 미납 시 서비스 이용을 제한할 수 있습니다.</li>
        </ul>
        <br/>
        <p className="font-semibold">제4조 (해지 및 연체)</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>이용자는 계약 기간 내 해지를 원할 경우, 회사가 정한 절차에 따라 해지 신청을 할 수 있습니다.</li>
          <li>중도 해지 시, 약정 위약금 또는 잔여 요금이 발생할 수 있으며, 구체적인 금액은 계약서에 따릅니다.</li>
          <li>이용자가 정해진 기일 내 요금을 연속 2회 이상 납부하지 않는 경우, 회사는 계약을 해지하고 제품 회수 조치를 취할 수 있습니다.</li>
          <li>계약 해지 시, 이용자는 제품을 원상태로 반환하여야 하며, 파손·분실 시 별도의 비용이 청구될 수 있습니다.</li>
        </ul>
        <br/>
        <p className="font-semibold">제5조 (회사와 이용자의 권리·의무)</p>
        <p className="font-medium">회사의 의무</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>안정적이고 지속적인 서비스 제공을 위해 노력합니다.</li>
          <li>제품 설치, 유지보수, A/S를 계약에 따라 제공합니다.</li>
          <li>이용자의 개인정보를 보호하고 관련 법령을 준수합니다.</li>
        </ul>
        <p className="font-medium">이용자의 의무</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>렌탈 제품을 정상적인 사용 범위에서 사용해야 합니다.</li>
          <li>요금을 성실히 납부하고, 회사 정책 및 관련 법령을 준수해야 합니다.</li>
          <li>제품의 파손, 분실, 도난 발생 시 지체 없이 회사에 통지해야 합니다.</li>
        </ul>
        <br/>
        <p className="font-semibold">제6조 (기타)</p>
        <ul className="list-disc list-inside ml-2 text-gray-400">
          <li>본 약관에 명시되지 않은 사항은 관련 법령 및 일반 상관습에 따릅니다.</li>
          <li>본 약관에 따른 분쟁은 대한민국 법을 준거법으로 하며, 관할 법원은 민사소송법상의 관할 법원으로 합니다.</li>
          <li>본 약관은 2025년 9월 17일부터 시행합니다.</li>
        </ul>
      </div>
    </div>
  )
}