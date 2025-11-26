import { callSpringAPI } from "@/lib/serverFetch";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  return callSpringAPI(req, "/api/admin/product", "GET");
}
