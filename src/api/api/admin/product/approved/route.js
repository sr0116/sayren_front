// app/api/admin/product/approved/route.js
import { callSpringAPI } from "@/lib/serverFetch";

export async function GET(req) {
    return callSpringAPI(req, "/api/admin/product/approved", "GET");
}
