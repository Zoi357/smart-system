/**
 * controllers/teacherGradesController.js
 * Teacher grade management operations
 */

const TeacherModel = require("../models/teacherModel");
const ConfigModel = require("../models/configModel");

/**
 * GET /api/teacher/grades/:subject_id
 * Get all grades for a subject
 */
async function getSubjectGrades(req, res, next) {
  try {
    const { subject_id } = req.params;
    const { teacher_id } = req.teacher;
    const config = await ConfigModel.getEnrollmentConfig();

    const grades = await TeacherModel.getSubjectGrades(subject_id, config.active_term);

    res.json({
      subject_id,
      term: config.active_term,
      grades,
      count: grades.length,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/teacher/grades
 * Submit or update grade for a student
 * Body: { student_id, subject_id, percentage }
 */
async function submitGrade(req, res, next) {
  try {
    const { teacher_id } = req.teacher;
    const { student_id, subject_id, percentage } = req.body;
    const config = await ConfigModel.getEnrollmentConfig();

    // Validate inputs
    if (!student_id || !subject_id || percentage === undefined) {
      return res.status(400).json({
        error: "student_id, subject_id, and percentage are required.",
      });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        error: "Percentage must be between 0 and 100.",
      });
    }

    // Submit grade
    const grade = await TeacherModel.submitGrade(
      student_id,
      subject_id,
      teacher_id,
      percentage,
      config.active_term
    );

    res.status(201).json({
      message: "Grade submitted successfully.",
      grade,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/teacher/grades/class/:subject_id
 * Get class grade statistics
 */
async function getClassGradeStats(req, res, next) {
  try {
    const { subject_id } = req.params;
    const { teacher_id } = req.teacher;
    const config = await ConfigModel.getEnrollmentConfig();

    const grades = await TeacherModel.getSubjectGrades(subject_id, config.active_term);

    if (grades.length === 0) {
      return res.json({
        subject_id,
        term: config.active_term,
        stats: {
          total_students: 0,
          graded_students: 0,
          average: 0,
          highest: 0,
          lowest: 0,
        },
      });
    }

    const percentages = grades.map(g => g.percentage).filter(p => p !== null);
    const average = percentages.length > 0 ? percentages.reduce((a, b) => a + b, 0) / percentages.length : 0;

    res.json({
      subject_id,
      term: config.active_term,
      stats: {
        total_students: grades.length,
        graded_students: percentages.length,
        average: Math.round(average * 100) / 100,
        highest: Math.max(...percentages),
        lowest: Math.min(...percentages),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSubjectGrades, submitGrade, getClassGradeStats };
