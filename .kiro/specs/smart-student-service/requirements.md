# Requirements Document

## Introduction

The Smart Student Service (SSS) is a full-stack web application built on Next.js (App Router) with a Node.js/Express backend and MySQL database. It provides students with a self-service portal to manage their academic life — from authentication and enrollment through grades, payments, attendance, and document requests — while giving administrators a verification and notification workflow powered by Firebase. An embedded AI assistant (JOBERT) is available on every page to guide students through any task.

The system follows the workflow: **Login → Dashboard → Select Service → Submit Request → Admin Verification → Notification Sent**.

---

## Glossary

- **System**: The Smart Student Service web application as a whole.
- **Student**: An enrolled individual who authenticates with a Student ID and password.
- **Admin**: An authorized university staff member who reviews and verifies student requests.
- **Auth_Service**: The JWT-based authentication module responsible for login, token issuance, and session management.
- **Dashboard**: The post-login landing page that presents all available service tiles to the Student.
- **Enrollment_Service**: The module that manages subject selection, enrollment submission, and approval.
- **Grades_Service**: The module that retrieves and displays academic grades and GWA.
- **Payment_Service**: The module that manages tuition fee assessment, payment submission, and balance tracking.
- **Attendance_Service**: The module that records and displays student attendance per subject.
- **Document_Service**: The module that handles document requests (TOR, certificates, etc.) and tracks their status.
- **Notification_Service**: The Firebase-powered module that sends push notifications to Students and Admins.
- **Admin_Verification_Workflow**: The process by which an Admin reviews, approves, or rejects a Student's submitted request.
- **JOBERT**: The AI assistant embedded in the portal, powered by the Gemini API, available on all pages.
- **JWT**: JSON Web Token used to authenticate API requests between the frontend and backend.
- **GWA**: General Weighted Average — the computed average of all subject grades for a semester.
- **TOR**: Transcript of Records — an official academic document issued by the Registrar.
- **Firebase**: The third-party push notification platform used by the Notification_Service.
- **Student ID**: An 8–12 digit numeric string that uniquely identifies a Student in the system.
- **Local Knowledge Base**: A static, bundled FAQ dataset covering common portal tasks, used as a fallback when the Gemini API is unavailable.

---

## Requirements

### Requirement 1: Student Authentication

**User Story:** As a Student, I want to log in with my Student ID and password, so that I can securely access my personal academic portal.

#### Acceptance Criteria

1. WHEN a Student submits a valid Student ID and password, THE Auth_Service SHALL issue a signed JWT with a 24-hour expiry and redirect the Student to the Dashboard within 2 seconds.
2. WHEN a Student submits an invalid Student ID or incorrect password, THE Auth_Service SHALL return an HTTP 401 response with the error message "Invalid Student ID or password" without revealing which field is incorrect.
3. WHEN a Student submits a Student ID that is not an 8–12 digit numeric string, THE Auth_Service SHALL reject the input client-side and display a validation message before the form is submitted to the server.
4. WHEN a Student attempts to access a protected route and the JWT has expired, THE Auth_Service SHALL clear the session cookie and redirect the Student to the login page with a query parameter indicating session expiry.
5. IF a Student attempts to access a protected route without a valid JWT, THEN THE Auth_Service SHALL redirect the Student to the login page without exposing the protected resource.
6. WHEN a JWT is successfully issued, THE Auth_Service SHALL store the JWT in an HTTP-only, Secure, SameSite=Strict cookie; no cookie SHALL be created when authentication fails.
7. WHEN a Student clicks the logout action, THE Auth_Service SHALL clear the session cookie and respond with HTTP 200 within 500ms, after which the Student SHALL be redirected to the login page.
8. WHEN a Student submits 5 consecutive failed login attempts within a 10-minute window, THE Auth_Service SHALL lock the account for 15 minutes and display a lockout message with the unlock time.

---

### Requirement 2: Dashboard and Service Selection

**User Story:** As a Student, I want to see a dashboard with all available services after logging in, so that I can quickly navigate to the service I need.

#### Acceptance Criteria

1. WHEN a Student successfully authenticates, THE Dashboard SHALL display service tiles for: Enrollment, Grades, Payments, Attendance, Document Requests, and Notifications within 3 seconds.
2. WHILE a Student's session is active, THE Dashboard SHALL display the Student's full name (as stored in the `students` table), course code, and current semester label in the header area.
3. WHEN a Student selects a service tile, THE Dashboard SHALL navigate to the corresponding service page within 500ms.
4. WHILE a Dashboard is displayed, THE Dashboard SHALL always render the notifications area, showing a count of zero and an empty list when no unread alerts exist.
5. THE Dashboard SHALL render all service tiles without horizontal scrolling and without any tile being clipped or hidden on screen widths from 320px to 1920px.
6. WHILE a Student's session is active, THE Dashboard SHALL display the JOBERT AI assistant widget on every authenticated page.
7. IF the backend fails to return the Student's profile data within 3 seconds of authentication, THEN THE Dashboard SHALL display a generic greeting ("Welcome, Student") and a retry button, without blocking access to service tiles.

---

### Requirement 3: Enrollment Management

**User Story:** As a Student, I want to submit an enrollment request for the upcoming semester, so that I can register my subjects and have them verified by an Admin.

#### Acceptance Criteria

1. WHEN a Student submits an enrollment request with at least one selected subject, THE Enrollment_Service SHALL save the request to the `enrollments` table with a status of "pending" and return a confirmation message containing the enrollment reference number within 3 seconds.
2. WHEN an Admin approves an enrollment request, THE Enrollment_Service SHALL update the enrollment status to "approved", record the Admin's ID and approval timestamp, and trigger the Notification_Service to notify the Student within 3 seconds.
3. WHEN an Admin rejects an enrollment request, THE Enrollment_Service SHALL update the enrollment status to "rejected", persist the rejection reason (1–500 characters) entered by the Admin, and trigger the Notification_Service to notify the Student within 3 seconds.
4. WHILE a Student's enrollment request has a status of "pending", THE Enrollment_Service SHALL enforce a UNIQUE database constraint on (student_id, semester) in the `enrollments` table so that a duplicate insertion returns a conflict error without creating a second record.
5. IF a Student attempts to select a subject whose current enrollment count equals its maximum capacity, THEN THE Enrollment_Service SHALL disable that subject's selection control and display the message "This subject is full" before the form is submitted.
6. WHEN a Student navigates to the enrollment page, THE Enrollment_Service SHALL display the most recent enrollment record's status ("pending", "approved", or "rejected") for the current semester.
7. WHEN the current date and time is past the enrollment deadline configured for the active semester, THE Enrollment_Service SHALL reject any new enrollment submission with an error message that includes the enrollment deadline date and time.
8. WHEN a Student submits an enrollment request with zero subjects selected, THE Enrollment_Service SHALL reject the submission client-side and display a validation message before the request is sent to the server.

---

### Requirement 4: Grades Viewing

**User Story:** As a Student, I want to view my grades per subject and my GWA, so that I can monitor my academic performance.

#### Acceptance Criteria

1. WHEN a Student navigates to the grades page, THE Grades_Service SHALL retrieve and display all subject grades for the Student's active enrollment semester from the `grades` table within 2 seconds.
2. WHEN the grades page finishes loading, THE Grades_Service SHALL compute and display the GWA as the arithmetic mean of all posted percentage scores (excluding subjects with unposted grades), rounded to two decimal places; IF no grades have been posted, THE Grades_Service SHALL display "GWA: N/A".
3. WHEN a Student selects a subject row, THE Grades_Service SHALL display the subject name, teacher name, percentage score, letter grade equivalent, and performance status ("Passed" for letter grades 1.00–3.00, "Failed" for 5.00) in read-only mode.
4. THE Grades_Service SHALL map percentage scores to letter grades using the Philippine Grading Scale: 99–100% = 1.00, 96–98% = 1.25, 93–95% = 1.50, 90–92% = 1.75, 87–89% = 2.00, 84–86% = 2.25, 81–83% = 2.50, 78–80% = 2.75, 75–77% = 3.00, and all scores below 75% (including 0%) = 5.00 (Failed).
5. IF a grade has not yet been posted for a subject, THEN THE Grades_Service SHALL display "Not yet available" for that subject's score, letter grade, and performance status fields instead of a blank or zero value.
6. THE Grades_Service SHALL render all grade fields without input controls (text fields, dropdowns, or buttons that modify data); any attempt to submit a grade modification via the API SHALL return HTTP 403.
7. IF the grades retrieval request fails or times out, THEN THE Grades_Service SHALL display an error message and a retry button without showing stale or partial data.

---

### Requirement 5: Payment and Tuition Management

**User Story:** As a Student, I want to view my tuition assessment and submit payments, so that I can settle my fees and track my balance.

#### Acceptance Criteria

1. WHEN a Student navigates to the payments page, THE Payment_Service SHALL retrieve and display all fee line items, their amounts, and their paid/unpaid status within 2 seconds.
2. WHEN the payments page finishes loading, THE Payment_Service SHALL compute and display the total assessment (sum of all fee line items), total amount paid, and remaining balance.
3. WHEN a Student submits a payment, THE Payment_Service SHALL record the transaction and update the displayed balance within 3 seconds.
4. WHEN a payment is successfully recorded, THE Payment_Service SHALL trigger the Notification_Service to send a payment confirmation to the Student; IF the Notification_Service is unavailable, THEN THE Payment_Service SHALL complete the payment record and log the notification failure for retry.
5. IF a Student attempts to submit a payment with an amount outside the range of 0.01 to 999,999,999.99 (inclusive), THEN THE Payment_Service SHALL reject the submission client-side and display a validation error before the request is sent to the server.
6. WHEN the payments page finishes loading, THE Payment_Service SHALL display a payment history list showing date, amount, and fee item for all past transactions, up to a maximum of 500 records.
7. WHEN an Admin verifies a payment record, THE Payment_Service SHALL update the payment status to "verified" and trigger the Notification_Service to notify the Student; IF the Notification_Service is unavailable, THEN THE Payment_Service SHALL complete the status update and log the notification failure for retry.
8. IF the payment submission request fails due to a server or network error, THEN THE Payment_Service SHALL display an error message and a retry button without recording a duplicate transaction.

---

### Requirement 6: Attendance Tracking

**User Story:** As a Student, I want to view my attendance record per subject, so that I can monitor my absences and avoid academic penalties.

#### Acceptance Criteria

1. WHEN a Student navigates to the attendance page, THE Attendance_Service SHALL retrieve and display attendance records per subject from the `attendance` table within 2 seconds.
2. WHEN the attendance page finishes loading, THE Attendance_Service SHALL display for each subject: total class meetings, number of days present, number of absences, and attendance percentage.
3. WHEN the attendance page finishes loading and a subject has at least one recorded class meeting, THE Attendance_Service SHALL compute the attendance percentage as: (days present ÷ total class meetings) × 100, rounded to one decimal place.
4. WHEN a Student's attendance percentage for a subject falls below 80% and the subject has at least one recorded class meeting, THE Attendance_Service SHALL display a visible warning indicator (e.g., a red badge or icon) on that subject's attendance row.
5. IF attendance records for a subject have not been entered by the teacher (total class meetings = 0), THEN THE Attendance_Service SHALL display "No records yet" for that subject and SHALL NOT display a warning indicator.
6. THE Attendance_Service SHALL render all attendance fields without input controls that modify data; any attempt to submit an attendance modification via the API SHALL return HTTP 403.
7. IF the attendance retrieval request fails or times out, THEN THE Attendance_Service SHALL display an error message and a retry button without showing stale or partial data.

---

### Requirement 7: Document Requests

**User Story:** As a Student, I want to request official documents from the Registrar, so that I can obtain records needed for employment, transfer, or other purposes.

#### Acceptance Criteria

1. WHEN a Student submits a document request with all required fields completed, THE Document_Service SHALL save the request with a status of "pending" and return a system-generated alphanumeric reference number within 3 seconds.
2. THE Document_Service SHALL support exactly the following document types: Transcript of Records (TOR), Certificate of Enrollment, Good Moral Certificate, Diploma, and Form 137.
3. WHEN an Admin approves a document request, THE Document_Service SHALL update the request status to "approved", record the Admin-entered expected release date, and trigger the Notification_Service to notify the Student with the expected release date within 3 seconds.
4. WHEN an Admin rejects a document request, THE Document_Service SHALL update the request status to "rejected", persist the rejection reason (10–500 characters) entered by the Admin, and trigger the Notification_Service to notify the Student within 3 seconds.
5. WHILE a document request of a given type has a status of "pending" and was submitted within the last 30 calendar days, THE Document_Service SHALL reject a new request for the same document type and display the message "You already have a pending request for this document type."
6. WHEN a Student navigates to the document requests page, THE Document_Service SHALL display the request history showing document type, submission date, status, and reference number for all past requests, sorted by submission date descending.
7. IF a Student submits a document request without selecting a document type or without providing all required fields (document type, purpose, number of copies), THEN THE Document_Service SHALL reject the submission client-side, highlight each missing field with a visible error indicator, and display a summary error message before the request is sent to the server.
8. The required fields for a document request are: document type (from the supported list), purpose (free text, 10–500 characters), and number of copies (integer, 1–10).

---

### Requirement 8: Admin Verification Workflow

**User Story:** As an Admin, I want to review and act on student requests, so that I can approve or reject enrollments, payments, and document requests in a timely manner.

#### Acceptance Criteria

1. WHEN an Admin logs in to the admin panel, THE Admin_Verification_Workflow SHALL display a list of all pending requests grouped by type (enrollment, payment, document) within 2 seconds.
2. WHEN an Admin approves a request, THE Admin_Verification_Workflow SHALL update the request status to "approved", record the Admin's ID and approval timestamp, and trigger the Notification_Service within 3 seconds; IF the Notification_Service is unavailable, THEN THE Admin_Verification_Workflow SHALL save the approval and retry the notification up to 3 times at 5-minute intervals.
3. WHEN an Admin submits a rejection, THE Admin_Verification_Workflow SHALL require a rejection reason of 10–500 characters; IF the rejection reason field is empty or outside this range, THE Admin_Verification_Workflow SHALL block the submission and display a validation error.
4. IF a request is made to an admin-only route without a JWT containing the "admin" role claim, THEN THE System SHALL return HTTP 403 and SHALL NOT expose any admin data or functionality.
5. WHEN an Admin searches for a student by name or Student ID, THE Admin_Verification_Workflow SHALL return matching results within 2 seconds; IF no matches are found, THE Admin_Verification_Workflow SHALL display "No students found matching your search."
6. THE Admin_Verification_Workflow SHALL display an audit log of all actions taken by Admins, including action type, target request ID, Admin ID, and timestamp, sorted by timestamp descending.
7. WHEN an Admin attempts to approve or reject a request that is no longer in "pending" status, THE Admin_Verification_Workflow SHALL return an error message stating "This request has already been processed" and SHALL NOT update the request record.

---

### Requirement 9: Firebase Push Notifications

**User Story:** As a Student, I want to receive push notifications for important updates, so that I am informed of enrollment approvals, payment confirmations, and document request status changes without having to check the portal manually.

#### Acceptance Criteria

1. WHEN a triggering event occurs (enrollment approved/rejected, payment confirmed/verified, document request approved/rejected), THE Notification_Service SHALL send a Firebase push notification to the affected Student's registered device within 5 seconds of the event.
2. WHEN a Student grants notification permission in the browser, THE Notification_Service SHALL register the device token with Firebase and store it in the `notifications` table linked to the Student's record within 3 seconds.
3. WHEN a Student has granted notification permission and a triggering event occurs, THE Notification_Service SHALL send a Firebase push notification to the Student's registered device.
4. IF a Student has not granted notification permission and a triggering event occurs, THEN THE Notification_Service SHALL display an in-app notification banner on the Dashboard the next time the Student loads the Dashboard.
5. THE Notification_Service SHALL store all notifications in the `notifications` table with fields: recipient Student ID, message (max 500 characters), type (one of: "enrollment", "payment", "document", "system"), read status (boolean), and timestamp.
6. WHEN a Student views the notifications panel, THE Notification_Service SHALL mark all displayed notifications as read and update the unread count on the Dashboard to reflect the change within 2 seconds.
7. IF a Firebase push notification delivery fails, THEN THE Notification_Service SHALL fall back to storing an in-app notification in the `notifications` table and display it as an in-app banner on the Student's next Dashboard load.
8. THE Notification_Service SHALL retain notification records in the `notifications` table for a minimum of 90 days; after 90 days, records SHALL be marked as archived and excluded from active notification queries but retained in the database.

---

### Requirement 10: JOBERT AI Assistant Integration

**User Story:** As a Student, I want an AI assistant available on every page, so that I can get instant guidance on any service without navigating away or contacting staff.

#### Acceptance Criteria

1. THE System SHALL render the JOBERT AI assistant widget on every authenticated page of the portal; the widget SHALL be visible without scrolling on all supported screen widths (320px–1920px).
2. WHEN a Student sends a message to JOBERT, THE System SHALL forward the message and the last 6 messages of conversation history to the Gemini API and display the response within 5 seconds; IF the Gemini API does not respond within 5 seconds, THEN THE System SHALL cancel the pending request and display the message "JOBERT is taking too long to respond. Please try again."
3. IF the Gemini API returns an error or is unreachable, THEN THE System SHALL query the Local Knowledge Base and return a matching response within 1 second; IF no match is found in the Local Knowledge Base, THE System SHALL display "I'm unable to answer that right now. Please contact the Registrar."
4. WHEN a Student clicks the thumbs-up or thumbs-down icon on a JOBERT response, THE System SHALL record the feedback (response ID, rating, timestamp) via an API call and update the icon state to reflect the recorded rating without requiring a page reload.
5. WHILE a Student is on a specific service page, THE System SHALL pre-populate JOBERT's input area with up to 3 context-aware quick-suggestion chips relevant to that page (e.g., "Explain my GWA" on the grades page, "How do I pay my balance?" on the payments page).
6. WHEN a Student opens the JOBERT widget, THE System SHALL display the context-aware quick-suggestion chips for the current page within 500ms of the widget opening.
