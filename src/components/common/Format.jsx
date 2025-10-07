export function formatPhoneNumber(number) {
  if (!number) return "";
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

// 날짜 포멧
export function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}