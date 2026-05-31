import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/teacher/login
 * Teacher authentication endpoint
 */
export async function POST(req: NextRequest) {
  try {
    const { teacher_id, password } = await req.json();

    if (!teacher_id || !password) {
      return NextResponse.json(
        { error: "Teacher ID and password are required." },
        { status: 400 }
      );
    }

    // Demo teacher accounts (in production, query database)
    const TEACHER_ACCOUNTS = [
      { id: "T001", password: "Teacher@2026", name: "Maria Santos", department: "Mathematics" },
      { id: "T002", password: "Teacher@2026", name: "Juan Dela Cruz", department: "English" },
      { id: "T003", password: "Teacher@2026", name: "Ana Reyes", department: "Science" },
      { id: "T004", password: "Teacher@2026", name: "Carlos Fernandez", department: "History" },
    ];

    const teacher = TEACHER_ACCOUNTS.find(
      (t) => t.id === teacher_id && t.password === password
    );

    if (!teacher) {
      return NextResponse.json(
        { error: "Invalid Teacher ID or password." },
        { status: 401 }
      );
    }

    // In production, generate JWT token here
    const response = NextResponse.json({
      message: "Login successful.",
      teacher: {
        teacher_id: teacher.id,
        full_name: teacher.name,
        department: teacher.department,
      },
    });

    // Set teacher session cookie (in production, use secure JWT)
    response.cookies.set("teacher_id", teacher.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
