// src/api/faqApi.js

// 지금은 더미 데이터 반환
export const faqData = async (page = 1, size = 10) => {
  const dummy = [
    {
      id: 1,
      category: "가입/계약",
      question: "렌탈 계약은 최소 몇 개월인가요?",
      answer: "기본 12개월 이상부터 가능합니다."
    },
    {
      id: 2,
      category: "가입/계약",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 조건에 따라 위약금이 발생할 수 있습니다."
    },

    // 결제
    {
      id: 3,
      category: "결제",
      question: "결제 수단은 어떤 것들이 있나요?",
      answer: "신용카드, 체크카드, 계좌이체, 간편결제를 지원합니다."
    },
    {
      id: 4,
      category: "결제",
      question: "정기 결제일은 변경할 수 있나요?",
      answer: "결제일 변경은 불가능하며, 최초 결제일 기준으로 매월 자동 결제됩니다."
    },

    // 배송/설치
    {
      id: 5,
      category: "배송/설치",
      question: "배송은 얼마나 걸리나요?",
      answer: "일반적으로 영업일 기준 2~3일 내 배송 및 설치가 진행됩니다."
    },

    // 해지/반품
    {
      id: 6,
      category: "해지/반품",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 기간 내 해지 시 잔여 기간에 따라 위약금이 발생할 수 있습니다."
    },
    {
      id: 7,
      category: "해지/반품",
      question: "제품에 불량이 있으면 교환이나 환불이 가능한가요?",
      answer: "제품 초기 불량은 무상 교환/환불이 가능하며, 일정 기간 이후에는 A/S 절차가 적용됩니다."
    },

    // 기타
    {
      id: 8,
      category: "기타",
      question: "고객센터 운영 시간은 어떻게 되나요?",
      answer: "고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다."
    },
    {
      id: 9,
      category: "기타",
      question: "질문사항은 어디에서 확인할 수 있나요?",
      answer: "질문사항은 홈페이지 자주묻는질문 또는 Q&A 페이지에서 확인 가능합니다."
    },
    {
      id: 10,
      category: "가입/계약",
      question: "렌탈 계약은 최소 몇 개월인가요?",
      answer: "기본 12개월 이상부터 가능합니다."
    },
    {
      id: 11,
      category: "가입/계약",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 조건에 따라 위약금이 발생할 수 있습니다."
    },

    // 결제
    {
      id: 12,
      category: "결제",
      question: "결제 수단은 어떤 것들이 있나요?",
      answer: "신용카드, 체크카드, 계좌이체, 간편결제를 지원합니다."
    },
    {
      id: 13,
      category: "결제",
      question: "정기 결제일은 변경할 수 있나요?",
      answer: "결제일 변경은 불가능하며, 최초 결제일 기준으로 매월 자동 결제됩니다."
    },

    // 배송/설치
    {
      id: 14,
      category: "배송/설치",
      question: "배송은 얼마나 걸리나요?",
      answer: "일반적으로 영업일 기준 2~3일 내 배송 및 설치가 진행됩니다."
    },

    // 해지/반품
    {
      id: 15,
      category: "해지/반품",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 기간 내 해지 시 잔여 기간에 따라 위약금이 발생할 수 있습니다."
    },
    {
      id: 16,
      category: "해지/반품",
      question: "제품에 불량이 있으면 교환이나 환불이 가능한가요?",
      answer: "제품 초기 불량은 무상 교환/환불이 가능하며, 일정 기간 이후에는 A/S 절차가 적용됩니다."
    },

    // 기타
    {
      id: 17,
      category: "기타",
      question: "고객센터 운영 시간은 어떻게 되나요?",
      answer: "고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다."
    },
    {
      id: 18,
      category: "기타",
      question: "질문사항은 어디에서 확인할 수 있나요?",
      answer: "질문사항은 홈페이지 자주묻는질문 또는 Q&A 페이지에서 확인 가능합니다."
    },
    {
      id: 1,
      category: "가입/계약",
      question: "렌탈 계약은 최소 몇 개월인가요?",
      answer: "기본 12개월 이상부터 가능합니다."
    },
    {
      id: 2,
      category: "가입/계약",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 조건에 따라 위약금이 발생할 수 있습니다."
    },

    // 결제
    {
      id: 3,
      category: "결제",
      question: "결제 수단은 어떤 것들이 있나요?",
      answer: "신용카드, 체크카드, 계좌이체, 간편결제를 지원합니다."
    },
    {
      id: 4,
      category: "결제",
      question: "정기 결제일은 변경할 수 있나요?",
      answer: "결제일 변경은 불가능하며, 최초 결제일 기준으로 매월 자동 결제됩니다."
    },

    // 배송/설치
    {
      id: 5,
      category: "배송/설치",
      question: "배송은 얼마나 걸리나요?",
      answer: "일반적으로 영업일 기준 2~3일 내 배송 및 설치가 진행됩니다."
    },

    // 해지/반품
    {
      id: 6,
      category: "해지/반품",
      question: "중도 해지 시 위약금이 있나요?",
      answer: "계약 기간 내 해지 시 잔여 기간에 따라 위약금이 발생할 수 있습니다."
    },
    {
      id: 7,
      category: "해지/반품",
      question: "제품에 불량이 있으면 교환이나 환불이 가능한가요?",
      answer: "제품 초기 불량은 무상 교환/환불이 가능하며, 일정 기간 이후에는 A/S 절차가 적용됩니다."
    },

    // 기타
    {
      id: 8,
      category: "기타",
      question: "고객센터 운영 시간은 어떻게 되나요?",
      answer: "고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다."
    },
    {
      id: 9,
      category: "기타",
      question: "질문사항은 어디에서 확인할 수 있나요?",
      answer: "질문사항은 홈페이지 자주묻는질문 또는 Q&A 페이지에서 확인 가능합니다."
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
