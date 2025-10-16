import { callSpringAPI } from "@/lib/serverFetch";

export const revalidate = false;

// Next.js 라우트에서 Spring API 프록시 호출
export async function GET(req) {
  return callSpringAPI(req, "/api/admin/product", "GET");
}
