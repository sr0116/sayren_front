import { NextResponse } from "next/server";
import {callSpringAPI} from "@/lib/serverFetch";

export async function GET(req) {
    return callSpringAPI(req, "/api/admin/product/pending", "GET");
}
