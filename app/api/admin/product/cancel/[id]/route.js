import { callSpringAPI } from "@/lib/serverFetch";

export async function POST(req, { params }) {
    const { id } = params;
    return callSpringAPI(req, `/api/admin/product/cancel/${id}`, "POST");
}
