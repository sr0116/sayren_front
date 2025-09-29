export const noticeData = async (page = 1, size = 10) => {
  const dummy = [
    { id: 1, title: "[9/17] 서버 점검 안내", date: "2025-09-15", views: 196 },
    { id: 2, title: "신규 상품 출시 안내", date: "2025-09-10", views: 132 },
    { id: 3, title: "추석 연휴 배송 안내", date: "2025-09-05", views: 88 },
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