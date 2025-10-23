// src/api/noticeApi.js

export const noticeData = async (page = 1, size = 10) => {
  const dummy = [
    {
      id: 1,
      title: "[공지] 10월 서버 정기 점검 안내",
      date: "2025-10-14",
      views: 243,
    },
    {
      id: 2,
      title: "[신규 기능] 렌탈 계약 자동 연장 시스템 오픈",
      date: "2025-10-10",
      views: 198,
    },
    {
      id: 3,
      title: "고객센터 상담 시간 변경 안내",
      date: "2025-10-07",
      views: 122,
    },
    {
      id: 4,
      title: "[이벤트] 신규 회원 대상 웰컴 쿠폰 지급",
      date: "2025-10-02",
      views: 355,
    },
    {
      id: 5,
      title: "추석 연휴 배송 및 설치 일정 공지",
      date: "2025-09-28",
      views: 410,
    },
    {
      id: 6,
      title: "렌탈 요금 청구 시스템 점검 안내",
      date: "2025-09-20",
      views: 165,
    },
    {
      id: 7,
      title: "[신상품] LG 퓨리케어 얼음정수기 출시",
      date: "2025-09-18",
      views: 302,
    },
    {
      id: 8,
      title: "회원 등급제도 변경 안내",
      date: "2025-09-14",
      views: 187,
    },
    {
      id: 9,
      title: "SAYREN 서비스 이용약관 개정 공지",
      date: "2025-09-10",
      views: 276,
    },
    {
      id: 10,
      title: "9월 정기 업데이트 내역 안내",
      date: "2025-09-05",
      views: 201,
    },
    {
      id: 11,
      title: "상품 리뷰 시스템 개선 예정 안내",
      date: "2025-09-02",
      views: 162,
    },
    {
      id: 12,
      title: "[중요] 개인정보 처리방침 변경 안내",
      date: "2025-08-28",
      views: 389,
    },
  ];

  const startIdx = (page - 1) * size;
  const endIdx = startIdx + size;
  const totalPage = Math.ceil(dummy.length / size);
  const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);

  return Promise.resolve({
    list: dummy.slice(startIdx, endIdx),
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
