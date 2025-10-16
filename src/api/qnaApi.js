// src/api/qnaApi.js

export const qnaData = async (page = 1, size = 10) => {
    const dummyQnas = [
        // 일반 문의
        {
            id: 1,
            type: "일반",
            title: "렌탈 상품의 월 요금은 언제 청구되나요?",
            createdAt: "2025-10-14",
            secret: false,
        },
        {
            id: 2,
            type: "일반",
            title: "제품 교체 신청은 어떻게 하나요?",
            createdAt: "2025-10-12",
            secret: true,
        },
        {
            id: 3,
            type: "일반",
            title: "결제 수단 변경이 가능한가요?",
            createdAt: "2025-10-10",
            secret: false,
        },
        {
            id: 4,
            type: "일반",
            title: "렌탈 계약서 사본을 다시 받고 싶어요.",
            createdAt: "2025-10-09",
            secret: false,
        },
        {
            id: 5,
            type: "일반",
            title: "회원 탈퇴 후에도 계약 내역이 남나요?",
            createdAt: "2025-10-08",
            secret: true,
        },

        // AS 문의
        {
            id: 6,
            type: "AS",
            title: "정수기에서 물이 잘 안 나와요.",
            createdAt: "2025-10-07",
            secret: false,
        },
        {
            id: 7,
            type: "AS",
            title: "에어컨에서 냄새가 나는데 점검 가능할까요?",
            createdAt: "2025-10-06",
            secret: true,
        },
        {
            id: 8,
            type: "AS",
            title: "냉장고가 냉동이 잘 안 됩니다.",
            createdAt: "2025-10-05",
            secret: false,
        },
        {
            id: 9,
            type: "AS",
            title: "공기청정기 필터 교체 주기가 궁금합니다.",
            createdAt: "2025-10-04",
            secret: false,
        },
        {
            id: 10,
            type: "AS",
            title: "세탁기 진동이 너무 심합니다.",
            createdAt: "2025-10-03",
            secret: true,
        },

        // 일반 + AS 추가
        {
            id: 11,
            type: "일반",
            title: "렌탈 중간에 상품을 업그레이드할 수 있나요?",
            createdAt: "2025-10-02",
            secret: false,
        },
        {
            id: 12,
            type: "AS",
            title: "건조기 소음이 점점 커지고 있어요.",
            createdAt: "2025-10-01",
            secret: false,
        },
        {
            id: 13,
            type: "일반",
            title: "렌탈 기간이 끝나면 제품은 어떻게 되나요?",
            createdAt: "2025-09-30",
            secret: false,
        },
        {
            id: 14,
            type: "AS",
            title: "제품 설치 후 전원이 안 켜져요.",
            createdAt: "2025-09-28",
            secret: true,
        },
    ];

    const startIdx = (page - 1) * size;
    const endIdx = startIdx + size;
    const totalPage = Math.ceil(dummyQnas.length / size);
    const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);

    return Promise.resolve({
        list: dummyQnas.slice(startIdx, endIdx),
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
