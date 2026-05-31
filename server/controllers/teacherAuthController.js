/**
 * controllers/teacherAuthController.js
 * Teacher authentication and authorization
 */

const TeacherModel = require("../models/teacherModel");

/**
 * POST /api/teacher/login
 * Authenticate teacher with ID and password
 */
async function login(req, res, next) {
  try {
    const { teacher_id, password } = req.body;

    if (!teacher_id || !password) {
      return res.status(400).json({ error: "Teacher ID and password are required." });
    }

    const teacher = await TeacherModel.findById(teacher_id);
    if (!teacher) {
      return res.status(401).json({ error: "Invalid Teacher ID or password." });
    }

    const isValid = await TeacherModel.verifyPassword(teacher_id, password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid Teacher ID or password." });
    }

    // In production, generate JWT token here
    res.json({
      message: "Login successful.",
      teacher: {
        teacher_id: teacher.teacher_id,
        full_name: teacher.full_name,
        department: teacher.department,
        email: teacher.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/teacher/profile
 * Get teacher profile information
 */
async function getProfile(req, res, next) {
  try {
    const { teacher_id } = req.teacher;
    const teacher = await TeacherModel.findById(teacher_id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found." });
    }

    res.json({ teacher });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/teacher/dashboard
 * Get teacher dashboard data
 */
async function getDashboard(req, res, next) {
  try {
    const { teacher_id } = req.teacher;

    const teacher = await TeacherModel.findById(teacher_id);
    const subjects = await TeacherModel.getAssignedSubjects(teacher_id);
    const students = await TeacherModel.getStudentsInClasses(teacher_id);
    const stats = await TeacherModel.getClassStatistics(teacher_id);
    const activity = await TeacherModel.getRecentActivity(teacher_id, 5);

    res.json({
      teacher,
      subjects,
      students,
      stats,
      activity,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, getProfile, getDashboard };
