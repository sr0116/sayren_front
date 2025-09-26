export function formatPhoneNumber(number) {
  if (!number) return "";
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}