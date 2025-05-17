import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = await request.json();

    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        email: email,
      },
    });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 400 }
    );
  }
}
