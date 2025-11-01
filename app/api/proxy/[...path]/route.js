import {callSpringAPI} from "@/lib/serverFetch";

export async function GET(req, { params }) {
  const path = "/" + params.path.join("/");
  return await callSpringAPI(req, path, "GET");
}

export async function POST(req, { params }) {
  const path = "/" + params.path.join("/");
  return await callSpringAPI(req, path, "POST");
}

export async function PUT(req, { params }) {
  const path = "/" + params.path.join("/");
  return await callSpringAPI(req, path, "PUT");
}

export async function PATCH(req, { params }) {
  const path = "/" + params.path.join("/");
  return await callSpringAPI(req, path, "PATCH");
}

export async function DELETE(req, { params }) {
  const path = "/" + params.path.join("/");
  return await callSpringAPI(req, path, "DELETE");
}
