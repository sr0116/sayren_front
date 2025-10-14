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

export function formatCurrency(value) {
  if (value == null) return "-";
  return value.toLocaleString("ko-KR") + "원";
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("ko-KR", { hour12: false });
}