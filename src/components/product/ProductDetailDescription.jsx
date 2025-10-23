export default function ProductDetailDescription({ html }) {

    // 각 문단별로 처리
    const formattedHtml = html.replace(
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


    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
                상품 상세정보
            </h2>

            <div>
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
            </div>
        </div>
    );
}
