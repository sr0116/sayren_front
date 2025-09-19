export default function PromotionBanner() {
  return (
      <section className="relative w-full h-[250px] my-16">
        <img
            src="https://source.unsplash.com/random/1200x400?promotion"
            alt="Promotion"
            className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">구독 할인 이벤트?</h2>
        </div>
      </section>
  );
}
