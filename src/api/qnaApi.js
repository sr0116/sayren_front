// src/api/qnaApi.js

export const qnaData = async (page = 1, size = 10) => {
    const dummyQnas = [
        // 일반 문의
        {
            id: 1,
            type: "일반",
            title: "렌탈 상품의 월 요금은 언제 청구되나요?",
            content: "렌탈 상품의 월 요금은 계약일 기준으로 매달 동일한 날짜에 자동 청구됩니다.",
            createdAt: "2025-10-14",
            secret: false,
        },
        {
            id: 2,
            type: "일반",
            title: "제품 교체 신청은 어떻게 하나요?",
            content: "고객센터 또는 마이페이지 내 ‘교체 신청’ 메뉴에서 접수하실 수 있습니다.",
            createdAt: "2025-10-12",
            secret: true,
        },
        {
            id: 3,
            type: "일반",
            title: "결제 수단 변경이 가능한가요?",
            content: "마이페이지 > 결제 관리 메뉴에서 등록된 결제 수단을 변경할 수 있습니다.",
            createdAt: "2025-10-10",
            secret: false,
        },
        {
            id: 4,
            type: "일반",
            title: "렌탈 계약서 사본을 다시 받고 싶어요.",
            content: "마이페이지 내 계약 상세 보기에서 계약서 PDF를 재발급받을 수 있습니다.",
            createdAt: "2025-10-09",
            secret: false,
        },
        {
            id: 5,
            type: "일반",
            title: "회원 탈퇴 후에도 계약 내역이 남나요?",
            content: "회원 탈퇴 시에도 법적 보관 기간 동안 계약 정보는 일정 기간 보관됩니다.",
            createdAt: "2025-10-08",
            secret: true,
        },
        {
            id: 11,
            type: "일반",
            title: "렌탈 중간에 상품을 업그레이드할 수 있나요?",
            content: "가능합니다. 업그레이드 신청 후 남은 기간 및 차액에 따라 재계약됩니다.",
            createdAt: "2025-10-02",
            secret: false,
        },
        {
            id: 13,
            type: "일반",
            title: "렌탈 기간이 끝나면 제품은 어떻게 되나요?",
            content: "계약 종료 후 제품을 반납하거나, 소유권 이전으로 인수받을 수 있습니다.",
            createdAt: "2025-09-30",
            secret: false,
        },

        // AS 문의
        {
            id: 6,
            type: "AS",
            title: "정수기에서 물이 잘 안 나와요.",
            content: "필터 막힘 또는 급수 압력 저하가 원인일 수 있습니다. 기사 방문을 신청해주세요.",
            createdAt: "2025-10-07",
            secret: false,
        },
        {
            id: 7,
            type: "AS",
            title: "에어컨에서 냄새가 나는데 점검 가능할까요?",
            content: "필터 오염이나 배수관 문제일 수 있습니다. AS 방문을 접수하시면 점검해드립니다.",
            createdAt: "2025-10-06",
            secret: true,
        },
        {
            id: 8,
            type: "AS",
            title: "냉장고가 냉동이 잘 안 됩니다.",
            content: "냉동실 온도 설정 및 문틈 고무패킹을 확인해주세요. 이상 시 서비스센터로 문의 바랍니다.",
            createdAt: "2025-10-05",
            secret: false,
        },
        {
            id: 9,
            type: "AS",
            title: "공기청정기 필터 교체 주기가 궁금합니다.",
            content: "사용 환경에 따라 다르지만 일반적으로 3~6개월 주기 교체를 권장합니다.",
            createdAt: "2025-10-04",
            secret: false,
        },
        {
            id: 10,
            type: "AS",
            title: "세탁기 진동이 너무 심합니다.",
            content: "설치면이 평평하지 않거나 수평 조절이 맞지 않을 때 발생할 수 있습니다. 기사 방문을 권장드립니다.",
            createdAt: "2025-10-03",
            secret: true,
        },
        {
            id: 12,
            type: "AS",
            title: "건조기 소음이 점점 커지고 있어요.",
            content: "필터 또는 통 내부 이물질이 원인일 수 있습니다. 청소 후에도 지속되면 점검 요청 바랍니다.",
            createdAt: "2025-10-01",
            secret: false,
        },
        {
            id: 14,
            type: "AS",
            title: "제품 설치 후 전원이 안 켜져요.",
            content: "전원선 연결 및 콘센트 전압을 확인해주세요. 이상이 없을 경우 AS 접수를 진행해주세요.",
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
