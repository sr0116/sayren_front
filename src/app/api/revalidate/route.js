// app/api/revalidate/route.js
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { paths, secret } = await req.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response(
      JSON.stringify({ revalidated: false, message: "Invalid secret" }),
      { status: 401 }
    );
  }

  if (!Array.isArray(paths)) {
    return new Response(
      JSON.stringify({ revalidated: false, message: "paths must be an array" }),
      { status: 400 }
    );
  }

  paths.forEach((path) => {
    revalidatePath(path);
  });

  return Response.json({ revalidated: true, paths });
}
