-- ============================================================
-- SHS Subjects Population Script
-- Insert all Academic & Technical-Professional subjects
-- ============================================================

USE smart_student_service;

-- ============================================================
-- CORE SUBJECTS (All Pathways)
-- ============================================================

-- English
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('ENG11', 'English for Academic Purposes', 3, 2, 40),
('ENG12', 'English for Academic Purposes 2', 3, 2, 40);

-- Filipino
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('FIL11', 'Filipino for Academic Purposes', 3, 2, 40),
('FIL12', 'Filipino for Academic Purposes 2', 3, 2, 40);

-- Mathematics
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('MATH11', 'General Mathematics', 3, 1, 40),
('MATH12', 'General Mathematics 2', 3, 1, 40);

-- Science
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('SCI11', 'Earth and Life Science', 4, 3, 40),
('SCI12', 'Earth and Life Science 2', 4, 3, 40);

-- MAPEH
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('MAPEH11', 'Music, Arts, PE, Health', 4, 4, 50),
('MAPEH12', 'Music, Arts, PE, Health 2', 4, 4, 50);

-- Computer Studies
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('COMP11', 'Computer Studies', 3, 2, 35),
('COMP12', 'Computer Studies 2', 3, 2, 35);

-- Humanities & Social Sciences
INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('HUMSS11', 'Humanities & Social Sciences', 3, 4, 40),
('HUMSS12', 'Humanities & Social Sciences 2', 3, 4, 40);

-- ============================================================
-- STEM TRACK SUBJECTS
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('PHYS11', 'Physics', 4, 3, 35),
('PHYS12', 'Physics 2', 4, 3, 35),
('CHEM11', 'Chemistry', 4, 3, 35),
('CHEM12', 'Chemistry 2', 4, 3, 35),
('BIO11', 'Biology', 4, 3, 35),
('BIO12', 'Biology 2', 4, 3, 35),
('PRECALC11', 'Pre-Calculus', 3, 1, 35),
('PRECALC12', 'Pre-Calculus 2', 3, 1, 35),
('ENGR11', 'Introduction to Engineering', 3, 2, 30),
('ENGR12', 'Introduction to Engineering 2', 3, 2, 30),
('PROG11', 'Introduction to Programming', 3, 2, 30),
('PROG12', 'Introduction to Programming 2', 3, 2, 30);

-- ============================================================
-- HUMMS TRACK SUBJECTS
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('HIST11', 'Philippine History', 3, 4, 40),
('HIST12', 'Philippine History 2', 3, 4, 40),
('GEOG11', 'Geography', 3, 4, 40),
('GEOG12', 'Geography 2', 3, 4, 40),
('ECON11', 'Economics', 3, 4, 40),
('ECON12', 'Economics 2', 3, 4, 40),
('PSYCH11', 'Psychology', 3, 4, 40),
('PSYCH12', 'Psychology 2', 3, 4, 40),
('PHILO11', 'Philosophy', 3, 4, 40),
('PHILO12', 'Philosophy 2', 3, 4, 40),
('ARTS11', 'Visual Arts', 3, 4, 35),
('ARTS12', 'Visual Arts 2', 3, 4, 35);

-- ============================================================
-- ABM TRACK SUBJECTS
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('ACCT11', 'Accounting 1', 3, 2, 35),
('ACCT12', 'Accounting 2', 3, 2, 35),
('BUS11', 'Business Management', 3, 2, 40),
('BUS12', 'Business Management 2', 3, 2, 40),
('ENTREP11', 'Entrepreneurship', 3, 2, 40),
('ENTREP12', 'Entrepreneurship 2', 3, 2, 40),
('FINANCE11', 'Personal Finance', 3, 2, 40),
('FINANCE12', 'Personal Finance 2', 3, 2, 40),
('MARKETING11', 'Marketing', 3, 2, 40),
('MARKETING12', 'Marketing 2', 3, 2, 40);

-- ============================================================
-- GAS TRACK SUBJECTS (General Academic Strand)
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('GAS11', 'General Academic Strand', 3, 4, 40),
('GAS12', 'General Academic Strand 2', 3, 4, 40);

-- ============================================================
-- TVL - ICT SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('PROG11', 'Programming 1', 4, 2, 30),
('PROG12', 'Programming 2', 4, 2, 30),
('NETW11', 'Networking Basics', 3, 2, 30),
('NETW12', 'Networking Basics 2', 3, 2, 30),
('HARD11', 'Hardware Maintenance', 3, 2, 30),
('HARD12', 'Hardware Maintenance 2', 3, 2, 30),
('SOFT11', 'Software Applications', 3, 2, 30),
('SOFT12', 'Software Applications 2', 3, 2, 30),
('CYBSEC11', 'Cybersecurity Basics', 3, 2, 30),
('CYBSEC12', 'Cybersecurity Basics 2', 3, 2, 30),
('ICTPROJ11', 'ICT Project 1', 3, 2, 25),
('ICTPROJ12', 'ICT Project 2', 3, 2, 25);

-- ============================================================
-- TVL - AUTOMOTIVE SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('AUTO11', 'Automotive Technology 1', 4, 3, 25),
('AUTO12', 'Automotive Technology 2', 4, 3, 25),
('AUTOELEC11', 'Automotive Electrical', 3, 3, 25),
('AUTOELEC12', 'Automotive Electrical 2', 3, 3, 25),
('AUTODIAG11', 'Automotive Diagnostics', 3, 3, 25),
('AUTODIAG12', 'Automotive Diagnostics 2', 3, 3, 25),
('AUTOMAINT11', 'Vehicle Maintenance', 3, 3, 25),
('AUTOMAINT12', 'Vehicle Maintenance 2', 3, 3, 25),
('AUTOSAFETY11', 'Automotive Safety', 2, 3, 30),
('AUTOSAFETY12', 'Automotive Safety 2', 2, 3, 30),
('AUTOPROJ11', 'Automotive Project 1', 3, 3, 20),
('AUTOPROJ12', 'Automotive Project 2', 3, 3, 20);

-- ============================================================
-- TVL - CULINARY ARTS SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('COOK11', 'Culinary Fundamentals', 4, 4, 25),
('COOK12', 'Culinary Fundamentals 2', 4, 4, 25),
('BAKE11', 'Baking & Pastry', 3, 4, 25),
('BAKE12', 'Baking & Pastry 2', 3, 4, 25),
('FOOD11', 'Food Safety & Sanitation', 2, 4, 30),
('FOOD12', 'Food Safety & Sanitation 2', 2, 4, 30),
('MENU11', 'Menu Planning', 3, 4, 25),
('MENU12', 'Menu Planning 2', 3, 4, 25),
('SERV11', 'Food Service', 3, 4, 30),
('SERV12', 'Food Service 2', 3, 4, 30),
('COOKPROJ11', 'Culinary Project 1', 3, 4, 20),
('COOKPROJ12', 'Culinary Project 2', 3, 4, 20);

-- ============================================================
-- TVL - HOSPITALITY SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('HOSP11', 'Hospitality Management', 4, 4, 30),
('HOSP12', 'Hospitality Management 2', 4, 4, 30),
('FRONT11', 'Front Office Operations', 3, 4, 30),
('FRONT12', 'Front Office Operations 2', 3, 4, 30),
('HOUSE11', 'Housekeeping Operations', 3, 4, 30),
('HOUSE12', 'Housekeeping Operations 2', 3, 4, 30),
('CUST11', 'Customer Service', 3, 4, 35),
('CUST12', 'Customer Service 2', 3, 4, 35),
('EVENT11', 'Event Management', 3, 4, 30),
('EVENT12', 'Event Management 2', 3, 4, 30),
('HOSPPROJ11', 'Hospitality Project 1', 3, 4, 25),
('HOSPPROJ12', 'Hospitality Project 2', 3, 4, 25);

-- ============================================================
-- TVL - ELECTRICAL INSTALLATION SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('ELEC11', 'Electrical Installation 1', 4, 3, 25),
('ELEC12', 'Electrical Installation 2', 4, 3, 25),
('ELECSAFETY11', 'Electrical Safety', 2, 3, 30),
('ELECSAFETY12', 'Electrical Safety 2', 2, 3, 30),
('ELECTOOLS11', 'Electrical Tools & Equipment', 3, 3, 25),
('ELECTOOLS12', 'Electrical Tools & Equipment 2', 3, 3, 25),
('ELECDIAG11', 'Electrical Diagnostics', 3, 3, 25),
('ELECDIAG12', 'Electrical Diagnostics 2', 3, 3, 25),
('ELECCODE11', 'Electrical Code', 2, 3, 30),
('ELECCODE12', 'Electrical Code 2', 2, 3, 30),
('ELECPROJ11', 'Electrical Project 1', 3, 3, 20),
('ELECPROJ12', 'Electrical Project 2', 3, 3, 20);

-- ============================================================
-- TVL - WELDING SPECIALIZATION
-- ============================================================

INSERT INTO subjects (code, name, units, teacher_id, max_capacity) VALUES
('WELD11', 'Welding Fundamentals', 4, 3, 25),
('WELD12', 'Welding Fundamentals 2', 4, 3, 25),
('METAL11', 'Metalworking', 3, 3, 25),
('METAL12', 'Metalworking 2', 3, 3, 25),
('WELDSAFETY11', 'Welding Safety', 2, 3, 30),
('WELDSAFETY12', 'Welding Safety 2', 2, 3, 30),
('WELDINS11', 'Weld Inspection', 3, 3, 25),
('WELDINS12', 'Weld Inspection 2', 3, 3, 25),
('WELDDESIGN11', 'Metal Design', 3, 3, 25),
('WELDDESIGN12', 'Metal Design 2', 3, 3, 25),
('WELDPROJ11', 'Welding Project 1', 3, 3, 20),
('WELDPROJ12', 'Welding Project 2', 3, 3, 20);

-- ============================================================
-- VERIFICATION
-- ============================================================

-- Count total subjects inserted
SELECT COUNT(*) as total_subjects FROM subjects;

-- Show subjects by category
SELECT 'Core Subjects' as category, COUNT(*) as count FROM subjects WHERE code IN ('ENG11','ENG12','FIL11','FIL12','MATH11','MATH12','SCI11','SCI12','MAPEH11','MAPEH12','COMP11','COMP12','HUMSS11','HUMSS12')
UNION ALL
SELECT 'STEM Subjects', COUNT(*) FROM subjects WHERE code LIKE 'PHYS%' OR code LIKE 'CHEM%' OR code LIKE 'BIO%' OR code LIKE 'PRECALC%' OR code LIKE 'ENGR%' OR code LIKE 'PROG%'
UNION ALL
SELECT 'HUMMS Subjects', COUNT(*) FROM subjects WHERE code LIKE 'HIST%' OR code LIKE 'GEOG%' OR code LIKE 'ECON%' OR code LIKE 'PSYCH%' OR code LIKE 'PHILO%' OR code LIKE 'ARTS%'
UNION ALL
SELECT 'ABM Subjects', COUNT(*) FROM subjects WHERE code LIKE 'ACCT%' OR code LIKE 'BUS%' OR code LIKE 'ENTREP%' OR code LIKE 'FINANCE%' OR code LIKE 'MARKETING%'
UNION ALL
SELECT 'GAS Subjects', COUNT(*) FROM subjects WHERE code LIKE 'GAS%'
UNION ALL
SELECT 'TVL Subjects', COUNT(*) FROM subjects WHERE code LIKE 'PROG%' OR code LIKE 'NETW%' OR code LIKE 'HARD%' OR code LIKE 'SOFT%' OR code LIKE 'CYBSEC%' OR code LIKE 'AUTO%' OR code LIKE 'COOK%' OR code LIKE 'BAKE%' OR code LIKE 'FOOD%' OR code LIKE 'MENU%' OR code LIKE 'SERV%' OR code LIKE 'HOSP%' OR code LIKE 'FRONT%' OR code LIKE 'HOUSE%' OR code LIKE 'CUST%' OR code LIKE 'EVENT%' OR code LIKE 'ELEC%' OR code LIKE 'WELD%' OR code LIKE 'METAL%';

-- ============================================================
-- END OF SCRIPT
-- ============================================================

