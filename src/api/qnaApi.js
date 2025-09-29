export const qnaData = async (page = 1, size = 10) => {
    const dummyQnas = [
        { id: 1, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 2, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 3, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 4, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 5, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 6, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 7, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 8, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 9, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 10, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 11, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 12, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
        { id: 13, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20", secret: false},
        { id: 14, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21", secret: true },
    ];

    const startIdx = (page - 1) * size;
    const endIdx = startIdx + size;
    const totalPage = Math.ceil(dummyQnas.length / size);

    const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);

    return Promise.resolve({
        list: dummyQnas.slice(startIdx, endIdx), // 현재 페이지 데이터만 자르기
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