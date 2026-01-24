import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxyRequest(req: NextRequest, method: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Get the path after /api/proxy/
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/proxy/, "");
  const targetUrl = `${API_BASE_URL}${path}${url.search}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  // Include body for methods that support it
  if (method !== "GET" && method !== "HEAD") {
    try {
      const body = await req.text();
      if (body) {
        fetchOptions.body = body;
      }
    } catch {
      // No body to parse
    }
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);

    // Handle empty responses (e.g., 204 No Content)
    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type");

    if (
      response.status === 204 ||
      contentLength === "0" ||
      !contentType?.includes("application/json")
    ) {
      // Return success with empty object for non-JSON responses
      return NextResponse.json(
        { success: true },
        { status: response.status === 204 ? 200 : response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return proxyRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "POST");
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, "DELETE");
}
