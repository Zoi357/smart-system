import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/teacher/attendance?subject_id=1
 * Get attendance records for a subject
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
    const attendance = [
      { student_id: "STU-2024-001", name: "Jamie Santos", present: 18, total: 20, percentage: 90, term: "Term 1" },
      { student_id: "STU-2024-002", name: "Maria Reyes", present: 19, total: 20, percentage: 95, term: "Term 1" },
      { student_id: "STU-2024-003", name: "Carlo Dela Cruz", present: 17, total: 20, percentage: 85, term: "Term 1" },
      { student_id: "STU-2024-005", name: "Luis Fernandez", present: 20, total: 20, percentage: 100, term: "Term 1" },
    ];

    return NextResponse.json({
      subject_id,
      term: "Term 1",
      attendance,
      count: attendance.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/teacher/attendance
 * Update attendance record
 */
export async function POST(req: NextRequest) {
  try {
    const teacher_id = req.cookies.get("teacher_id")?.value;
    const { student_id, subject_id, total_meetings, days_present } = await req.json();

    if (!teacher_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    if (!student_id || !subject_id || total_meetings === undefined || days_present === undefined) {
      return NextResponse.json(
        { error: "student_id, subject_id, total_meetings, and days_present are required." },
        { status: 400 }
      );
    }

    if (days_present > total_meetings) {
      return NextResponse.json(
        { error: "Days present cannot exceed total meetings." },
        { status: 400 }
      );
    }

    if (days_present < 0 || total_meetings < 0) {
      return NextResponse.json(
        { error: "Days present and total meetings must be non-negative." },
        { status: 400 }
      );
    }

    const attendance_percentage = total_meetings > 0 ? (days_present / total_meetings) * 100 : 0;

    // In production, save to database
    return NextResponse.json(
      {
        message: "Attendance updated successfully.",
        record: {
          student_id,
          subject_id,
          total_meetings,
          days_present,
          attendance_percentage: Math.round(attendance_percentage * 100) / 100,
          term: "Term 1",
          updated_by: teacher_id,
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
