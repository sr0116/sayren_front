export default function TagBadge({ label, color = "gray" }) {
  const colorClass = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
  }[color];

  return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}