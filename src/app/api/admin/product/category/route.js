import {NextResponse} from "next/server";

export async function callSpringAPI(req, path, method = "GET") {
    const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/category`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


    const data = await res.json();
    return NextResponse.json(data);
}
