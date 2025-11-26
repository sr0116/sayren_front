export function getServerUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
  // SSR, CSR 모두 /api/proxy 사용
}
