"use client";

export default function MegaMenuPanel() {
  return (
      <div className="grid grid-cols-4 gap-8">
        {/* TV */}
        <div>
          <h3 className="font-semibold mb-3">TV</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>올레드</li>
            <li>QNED</li>
            <li>나노셀</li>
            <li>울트라 HD</li>
            <li>일반 LED</li>
            <li>라이프스타일 스크린</li>
            <li>TV+사운드바</li>
          </ul>
        </div>

        {/* 오디오 */}
        <div>
          <h3 className="font-semibold mb-3">오디오</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>블루투스 이어폰</li>
            <li>무선 스피커</li>
            <li>사운드바</li>
            <li>오디오/플레이어</li>
          </ul>
        </div>

        {/* 상업용 디스플레이 */}
        <div>
          <h3 className="font-semibold mb-3">상업용 디스플레이</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>올레드 사이니지</li>
            <li>전자칠판</li>
            <li>단독형사이니지</li>
            <li>비디오월</li>
            <li>LED 사이니지</li>
            <li>원곡</li>
            <li>키오스크</li>
            <li>스트레치</li>
          </ul>
        </div>

        {/* 마인드웰니스 */}
        <div>
          <h3 className="font-semibold mb-3">마인드웰니스</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>brid.zzz</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700">
            #갤러리디자인
          </span>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700">
            #홈 엔터테인먼트
          </span>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700">
            #캠핑영화관
          </span>
          </div>
        </div>
      </div>
  );
}
