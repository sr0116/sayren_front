import { useState, useMemo } from "react";

export default function ProductDetailDescription({ html }) {
    const [expanded, setExpanded] = useState(false);

    // 각 문단별로 처리
    const formattedHtml = useMemo(() => {
        if (!html) return "";

        return html.replace(
            /<p>(.*?)<\/p>/gs,
            (match, content) => {
                const text = content.trim();
                // 글자 길이로 타이틀 판단
                if (text.length <= 25) {
                    return `<p class="highlight-title">${text}</p>`;
                }
                return `<p>${text}</p>`;
            }
        );
    }, [html]);


    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
                상품 상세정보
            </h2>

            <div
                className={`
          relative transition-all overflow-hidden
          ${expanded ? "max-h-[9999px]" : "max-h-[400px]"}
        `}
            >
                <div
                    className="
                       space-y-10
                        [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-center [&_h1]:mt-12 [&_h1]:mb-6
                        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4
                        [&_p]:text-[19px] [&_p]:text-gray-800 [&_p]:font-semibold
                        [&_p]:leading-[1.9] [&_p]:my-5 [&_p]:text-center
                        [&_strong]:text-[#ff0066] [&_strong]:font-bold
                        [&_img]:rounded-2xl [&_img]:my-10 [&_img]:mx-auto [&_img]:shadow-md
                        [&_img]:max-w-[900px] [&_img]:w-full
                        max-w-5xl mx-auto px-4 sm:px-8
                      "
                    dangerouslySetInnerHTML={{ __html: formattedHtml }}
                />
                {!expanded && (
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                        <button
                            onClick={() => setExpanded(true)}
                            className="bg-black text-white font-semibold px-6 py-2 rounded-full mb-4 shadow hover:bg-[#e5005c] transition"
                        >
                            더보기 ↓
                        </button>
                    </div>
                )}
            </div>

            {expanded && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setExpanded(false)}
                        className="text-black font-semibold border border-[#ff0066] px-6 py-2 rounded-full hover:bg-[#ff0066] hover:text-white transition"
                    >
                        접기 ↑
                    </button>
                </div>
            )}
        </div>
    );
}
