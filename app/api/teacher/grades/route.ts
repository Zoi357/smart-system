import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/teacher/grades?subject_id=1
 * Get grades for a subject
 */
export async function GET(req: NextRequest) {
  try {
    const teacher_id = req.cookies.get("teacher_id")?.value;
    const subject_id = req.nextUrl.searchParams.get("subject_id");

    if (!teacher_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    if (!subject_id) {
      return NextResponse.json(
        { error: "subject_id parameter is required." },
        { status: 400 }
      );
    }

    // Demo data (in production, query database)
    const grades = [
      { student_id: "STU-2024-001", name: "Jamie Santos", percentage: 92, term: "Term 1" },
      { student_id: "STU-2024-002", name: "Maria Reyes", percentage: 87, term: "Term 1" },
      { student_id: "STU-2024-003", name: "Carlo Dela Cruz", percentage: 95, term: "Term 1" },
      { student_id: "STU-2024-005", name: "Luis Fernandez", percentage: 88, term: "Term 1" },
    ];

    return NextResponse.json({
      subject_id,
      term: "Term 1",
      grades,
      count: grades.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/teacher/grades
 * Submit or update a grade
 */
export async function POST(req: NextRequest) {
  try {
    const teacher_id = req.cookies.get("teacher_id")?.value;
    const { student_id, subject_id, percentage } = await req.json();

    if (!teacher_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    if (!student_id || !subject_id || percentage === undefined) {
      return NextResponse.json(
        { error: "student_id, subject_id, and percentage are required." },
        { status: 400 }
      );
    }

    if (percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: "Percentage must be between 0 and 100." },
        { status: 400 }
      );
    }

    // In production, save to database
    return NextResponse.json(
      {
        message: "Grade submitted successfully.",
        grade: {
          student_id,
          subject_id,
          percentage,
          term: "Term 1",
          submitted_by: teacher_id,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
