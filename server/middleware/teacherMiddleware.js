/**
 * middleware/teacherMiddleware.js
 * Teacher authentication and authorization middleware
 */

/**
 * Verify teacher is authenticated
 * In production, this would verify JWT token
 */
function verifyTeacher(req, res, next) {
  // For demo purposes, check if teacher_id is in session/headers
  const teacher_id = req.headers["x-teacher-id"] || req.session?.teacher_id;

  if (!teacher_id) {
    return res.status(401).json({ error: "Unauthorized. Please log in as a teacher." });
  }

  req.teacher = { teacher_id };
  next();
}

/**
 * Verify teacher owns the resource
 */
function verifyTeacherOwnership(req, res, next) {
  const { teacher_id } = req.teacher;
  const { subject_id } = req.params;

  // In production, verify that teacher_id is assigned to subject_id
  // For now, just pass through
  next();
}

module.exports = { verifyTeacher, verifyTeacherOwnership };
