import { callSpringAPI } from "@/lib/serverFetch";

export async function POST(req) {
    return callSpringAPI(req, "/api/admin/product/delete", "DELETE");
}
