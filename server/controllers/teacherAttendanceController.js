/**
 * controllers/teacherAttendanceController.js
 * Teacher attendance management operations
 */

const TeacherModel = require("../models/teacherModel");
const ConfigModel = require("../models/configModel");

/**
 * GET /api/teacher/attendance/:subject_id
 * Get attendance records for a subject
 */
async function getSubjectAttendance(req, res, next) {
  try {
    const { subject_id } = req.params;
    const { teacher_id } = req.teacher;
    const config = await ConfigModel.getEnrollmentConfig();

    const attendance = await TeacherModel.getSubjectAttendance(subject_id, config.active_term);

    res.json({
      subject_id,
      term: config.active_term,
      attendance,
      count: attendance.length,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/teacher/attendance
 * Update attendance record for a student
 * Body: { student_id, subject_id, total_meetings, days_present }
 */
async function updateAttendance(req, res, next) {
  try {
    const { teacher_id } = req.teacher;
    const { student_id, subject_id, total_meetings, days_present } = req.body;
    const config = await ConfigModel.getEnrollmentConfig();

    // Validate inputs
    if (!student_id || !subject_id || total_meetings === undefined || days_present === undefined) {
      return res.status(400).json({
        error: "student_id, subject_id, total_meetings, and days_present are required.",
      });
    }

    if (days_present > total_meetings) {
      return res.status(400).json({
        error: "Days present cannot exceed total meetings.",
      });
    }

    if (days_present < 0 || total_meetings < 0) {
      return res.status(400).json({
        error: "Days present and total meetings must be non-negative.",
      });
    }

    // Update attendance
    const record = await TeacherModel.updateAttendance(
      student_id,
      subject_id,
      total_meetings,
      days_present,
      config.active_term
    );

    const attendance_percentage = total_meetings > 0 ? (days_present / total_meetings) * 100 : 0;

    res.status(201).json({
      message: "Attendance updated successfully.",
      record: {
        ...record,
        attendance_percentage: Math.round(attendance_percentage * 100) / 100,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/teacher/attendance/class/:subject_id
 * Get class attendance statistics
 */
async function getClassAttendanceStats(req, res, next) {
  try {
    const { subject_id } = req.params;
    const { teacher_id } = req.teacher;
    const config = await ConfigModel.getEnrollmentConfig();

    const attendance = await TeacherModel.getSubjectAttendance(subject_id, config.active_term);

    if (attendance.length === 0) {
      return res.json({
        subject_id,
        term: config.active_term,
        stats: {
          total_students: 0,
          average_attendance: 0,
          highest_attendance: 0,
          lowest_attendance: 0,
        },
      });
    }

    const percentages = attendance.map(a => (a.days_present / a.total_meetings) * 100);
    const average = percentages.reduce((a, b) => a + b, 0) / percentages.length;

    res.json({
      subject_id,
      term: config.active_term,
      stats: {
        total_students: attendance.length,
        average_attendance: Math.round(average * 100) / 100,
        highest_attendance: Math.round(Math.max(...percentages) * 100) / 100,
        lowest_attendance: Math.round(Math.min(...percentages) * 100) / 100,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSubjectAttendance, updateAttendance, getClassAttendanceStats };
