//  공용 카드
export default function CardContainer({ children, className = "" }) {
  return (
      <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition ${className}`}>
        {children}
      </div>
  );
}
