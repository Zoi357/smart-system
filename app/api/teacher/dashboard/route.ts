import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/teacher/dashboard
 * Get teacher dashboard data
 */
export async function GET(req: NextRequest) {
  try {
    const teacher_id = req.cookies.get("teacher_id")?.value;

    if (!teacher_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Demo data (in production, query database)
    const dashboardData = {
      teacher: {
        teacher_id,
        full_name: "Maria Santos",
        department: "Mathematics",
        email: "maria.santos@cfei.edu",
      },
      subjects: [
        { id: 1, code: "MATH101", name: "Algebra I", units: 3, enrolled: 35, max: 40 },
        { id: 2, code: "MATH102", name: "Geometry", units: 3, enrolled: 32, max: 40 },
        { id: 3, code: "MATH201", name: "Calculus I", units: 4, enrolled: 28, max: 35 },
      ],
      stats: {
        total_subjects: 3,
        total_students: 95,
        avg_grade: 90.5,
      },
      activity: [
        { action: "Grade Submitted", name: "Jamie Santos", time: "2h ago", icon: "📊" },
        { action: "Attendance Updated", name: "Maria Reyes", time: "3h ago", icon: "✓" },
      ],
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
