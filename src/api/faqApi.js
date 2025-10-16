// src/api/faqApi.js

// 지금은 더미 데이터 반환
export const faqData = async (page = 1, size = 10) => {
  const dummy = [
    // 가입/계약
    {
      id: 1,
      category: "가입/계약",
      question: "렌탈 서비스 이용을 위해 회원가입이 필요한가요?",
      answer: "네, 서비스 이용을 위해 간단한 회원가입이 필요하며 소셜 계정(카카오, 네이버, 구글)으로도 가입 가능합니다.",
    },
    {
      id: 2,
      category: "가입/계약",
      question: "렌탈 계약 기간은 얼마나 되나요?",
      answer: "제품마다 다르지만 일반적으로 최소 12개월부터 최대 36개월까지 선택 가능합니다.",
    },
    {
      id: 3,
      category: "가입/계약",
      question: "계약 연장은 어떻게 하나요?",
      answer: "계약 만료 30일 전 알림이 발송되며, 마이페이지에서 ‘계약 연장 신청’을 통해 손쉽게 연장하실 수 있습니다.",
    },
    {
      id: 4,
      category: "가입/계약",
      question: "계약 중간에 다른 제품으로 변경할 수 있나요?",
      answer: "계약 중 제품 교체는 불가능하며, 해지 후 재계약을 통해 새로운 제품을 선택하실 수 있습니다.",
    },

    // 결제
    {
      id: 5,
      category: "결제",
      question: "결제는 언제 이루어지나요?",
      answer: "최초 결제일 기준으로 매월 자동 결제가 진행되며, 결제일은 변경이 불가합니다.",
    },
    {
      id: 6,
      category: "결제",
      question: "어떤 결제 수단을 사용할 수 있나요?",
      answer: "신용카드, 체크카드, 계좌이체, 카카오페이, 네이버페이 등 다양한 간편결제 수단을 지원합니다.",
    },
    {
      id: 7,
      category: "결제",
      question: "결제 실패 시 어떻게 해야 하나요?",
      answer: "결제 실패 시 안내 알림이 발송되며, 24시간 이내에 결제 수단을 다시 등록하시면 자동 재결제가 시도됩니다.",
    },

    // 배송/설치
    {
      id: 8,
      category: "배송/설치",
      question: "배송 기간은 얼마나 걸리나요?",
      answer: "주문 후 평균 2~5일 내 기사님이 방문하여 설치까지 완료됩니다. 지역과 제품에 따라 상이할 수 있습니다.",
    },
    {
      id: 9,
      category: "배송/설치",
      question: "설치 전 미리 연락을 주시나요?",
      answer: "네, 설치 하루 전 담당 기사가 고객님께 연락드려 방문 일정을 조율합니다.",
    },
    {
      id: 10,
      category: "배송/설치",
      question: "설치 공간이 협소해도 가능한가요?",
      answer: "기사님 방문 시 설치 가능 여부를 직접 확인하며, 설치가 불가능한 경우 환불 처리가 가능합니다.",
    },

    // 해지/반품
    {
      id: 11,
      category: "해지/반품",
      question: "계약 기간 중 해지할 수 있나요?",
      answer: "네, 해지할 수 있습니다. 다만 잔여 기간에 따라 위약금이 발생할 수 있습니다.",
    },
    {
      id: 12,
      category: "해지/반품",
      question: "반품 절차는 어떻게 되나요?",
      answer: "고객센터를 통해 반품 신청 후, 회수 기사님이 방문하여 제품을 수거합니다. 수거 후 검수 과정을 거쳐 환불이 진행됩니다.",
    },
    {
      id: 13,
      category: "해지/반품",
      question: "제품이 고장난 경우 어떻게 해야 하나요?",
      answer: "A/S 신청을 통해 무상 또는 유상 수리가 가능하며, 초기 불량의 경우 교환 또는 전액 환불이 가능합니다.",
    },
    {
      id: 14,
      category: "해지/반품",
      question: "해지 신청 후 재가입은 가능한가요?",
      answer: "해지 완료 후 언제든지 동일 계정으로 재가입하여 서비스를 다시 이용하실 수 있습니다.",
    },

    // 기타
    {
      id: 15,
      category: "기타",
      question: "고객센터 운영 시간은 어떻게 되나요?",
      answer: "평일 오전 9시부터 오후 6시까지 운영되며, 주말 및 공휴일은 휴무입니다.",
    },
    {
      id: 16,
      category: "기타",
      question: "제품 사용법은 어디서 확인할 수 있나요?",
      answer: "각 제품 상세 페이지 내 ‘사용 가이드’ 섹션 또는 동영상 매뉴얼을 통해 확인하실 수 있습니다.",
    },
    {
      id: 17,
      category: "기타",
      question: "영수증은 어디서 확인할 수 있나요?",
      answer: "결제 완료 후 마이페이지 → 결제내역 메뉴에서 전자영수증을 바로 확인 및 다운로드할 수 있습니다.",
    },
    {
      id: 18,
      category: "기타",
      question: "포인트나 쿠폰은 어떻게 사용하나요?",
      answer: "결제 단계에서 보유한 포인트 또는 쿠폰을 선택하여 즉시 할인 적용이 가능합니다.",
    },
  ];
  const startIdx = (page - 1) * size;
  const endIdx = startIdx + size;
  const totalPage = Math.ceil(dummy.length / size);

  const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);

  return Promise.resolve({
    list: dummy.slice(startIdx, endIdx), // 현재 페이지 데이터만 자르기
    page,
    size,
    totalPage,
    start: 1,
    end: totalPage,
    prev: page > 1,
    next: page < totalPage,
    pageList,
  });
};

// 나중에 서버 붙이면 이렇게
/*
import axios from "axios";
export const faqData = async () => {
  const res = await axios.get("http://localhost:8080/api/faqs");
  return res.data;
};
*/
