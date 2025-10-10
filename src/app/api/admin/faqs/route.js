import { callSpringAPI } from "@/lib/serverFetch";

// Spring의 /api/admin/faqs/all
export async function GET(req) {
    return await callSpringAPI(req, "/api/admin/faqs/all", "GET");
}

// FAQ 등록
export async function POST(req) {
    return await callSpringAPI(req, "/api/admin/faqs", "POST");
}
