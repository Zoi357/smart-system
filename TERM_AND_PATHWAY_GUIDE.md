# INFORM System: Term Structure & Pathway Guide
## Philippine SHS Compliance (SY 2026-2027)

---

## 📅 New 3-Term Trimester System

### School Year 2026-2027 Calendar

| Term | Period | Duration | Class Days | Key Dates |
|------|--------|----------|-----------|-----------|
| **Term 1** | June - September | 4 months | ~67 days | June 8 - Sept 30, 2026 |
| **Term 2** | September - December | 4 months | ~67 days | Oct 1 - Dec 31, 2026 |
| **Term 3** | January - March | 3 months | ~67 days | Jan 1 - Mar 31, 2027 |
| **Summer** | April - May | 2 months | - | Apr 1 - May 31, 2027 |

**Total Class Days**: 201 days per school year

### Term Dates in System
- **Current Active Term**: Term 1 (June-September 2026)
- **Display Format**: "Term 1 · 2025–2026" (in student dashboard)
- **Enrollment Deadline**: June 15, 2026

---

## 🎓 New 2-Pathway Curriculum Structure

### Academic Pathway
Designed for students pursuing higher education and professional careers requiring college degrees.

**Included Strands**:
- **STEM** - Science, Technology, Engineering, Mathematics
- **GAS** - General Academic Strand
- **HUMMS** - Humanities and Social Sciences
- **ABM** - Accountancy, Business, and Management

**Grade Levels**: Grade 11 & Grade 12

**Typical Subjects**:
- Core: English, Filipino, Mathematics, Science, Social Studies
- Specialized: Physics, Chemistry, Biology, Calculus, Economics, etc.

---

### Technical-Professional (TechPro) Pathway
Designed for students pursuing technical and vocational careers with immediate employment opportunities.

**Included Strands**:
- **TVL** - Technical-Vocational-Livelihood

**Grade Levels**: Grade 11 & Grade 12

**Typical Subjects**:
- Core: English, Filipino, Mathematics, Science, Social Studies
- Technical: Welding, Automotive, Electrical, Culinary, etc.

---

## 🔄 System Field Mappings

### Database Field Changes

#### Students Table
```sql
-- Old Structure
course VARCHAR(50)          -- e.g., "STEM", "TVL", "ABM"
year_level TINYINT          -- e.g., 1, 2, 3, 4
semester VARCHAR(50)        -- e.g., "1st Semester"

-- New Structure
pathway VARCHAR(50)         -- e.g., "Academic", "TechPro"
grade_level TINYINT         -- e.g., 11, 12
term VARCHAR(50)            -- e.g., "Term 1", "Term 2", "Term 3"
```

#### Enrollment Records
```sql
-- Old
semester VARCHAR(50)        -- "1st Semester", "2nd Semester"

-- New
term VARCHAR(50)            -- "Term 1", "Term 2", "Term 3"
```

#### Grades & Attendance
```sql
-- Old
semester VARCHAR(50)

-- New
term VARCHAR(50)
```

---

## 📊 Student Dashboard Display

### Before (Old System)
```
Welcome, Jamie Santos
STU-2024-001 · STEM Grade 11 · 1st Semester SY 2025–2026

My Grades
1st Semester · 2025–2026

My Schedule
1st Semester · 2025–2026

Tuition Fee
1st Semester · 2025–2026
```

### After (New System)
```
Welcome, Jamie Santos
STU-2024-001 · Academic Grade 11 · Term 1 SY 2025–2026

My Grades
Term 1 · 2025–2026

My Schedule
Term 1 · 2025–2026

Tuition Fee
Term 1 · 2025–2026
```

---

## 📝 Enrollment Form Changes

### Pathway Selection
Students now select their pathway instead of individual tracks:

```
Pathway *
┌─────────────────────────────────────────────────────┐
│ Select a pathway                                    │
├─────────────────────────────────────────────────────┤
│ Academic Pathway (STEM, GAS, HUMMS, ABM)           │
│ Technical-Professional (TechPro) Pathway (TVL)     │
└─────────────────────────────────────────────────────┘
```

### Grade Level Selection
```
Grade Level *
┌─────────────────────────────────────────────────────┐
│ Select grade level                                  │
├─────────────────────────────────────────────────────┤
│ Grade 11                                            │
│ Grade 12                                            │
└─────────────────────────────────────────────────────┘
```

### Enrollment Success Display
```
Enrollment Details
─────────────────────────────────────────
Name: Jamie Santos
Status: New Student
Pathway: Academic
Grade Level: Grade 11 · Term 1 (June-September 2026)
```

---

## 🔐 Admin Dashboard Updates

### Student Records
```
Students Table
─────────────────────────────────────────────────────
ID          | Name           | Pathway  | Grade | GWA
STU-2024-001| Jamie Santos   | Academic | 11    | 1.75
STU-2024-002| Maria Reyes    | Academic | 11    | 2.00
STU-2024-006| Rosa Bautista  | TechPro  | 11    | 2.50
```

### Enrollment Panel
```
Enrollment Status
─────────────────────────────────────────────────────
School Year 2025–2026 · Deadline: June 15, 2026

Total Enrolled: 6
Confirmed: 4
Pending Review: 2
```

### Tuition Records
```
Tuition Records
─────────────────────────────────────────────────────
Term 1 · Academic Year 2025–2026

Total Assessment: ₱176,400
Total Collected: ₱154,350
Total Balance Due: ₱22,050
```

---

## 🔗 API Endpoint Updates

### Grades Endpoint
```
GET /api/grades

Response (Old):
{
  "semester": "1st Semester",
  "grades": [...],
  "gwa": 1.75
}

Response (New):
{
  "term": "Term 1",
  "grades": [...],
  "gwa": 1.75
}
```

### Attendance Endpoint
```
GET /api/attendance

Response (Old):
{
  "semester": "1st Semester",
  "attendance": [...]
}

Response (New):
{
  "term": "Term 1",
  "attendance": [...]
}
```

### Enrollment Endpoint
```
POST /api/enrollment

Request Body:
{
  "subjects": [1, 2, 3, 4, 5]
}

Response (Old):
{
  "message": "Enrollment submitted successfully.",
  "reference_number": "ENR-123",
  "enrollment": {
    "semester": "1st Semester",
    ...
  }
}

Response (New):
{
  "message": "Enrollment submitted successfully.",
  "reference_number": "ENR-123",
  "enrollment": {
    "term": "Term 1",
    ...
  }
}
```

---

## 📋 Configuration Updates

### Enrollment Config Table
```sql
-- Old
SELECT * FROM enrollment_config;
┌────┬──────────────────┬─────────────────────┐
│ id │ active_semester  │ deadline            │
├────┼──────────────────┼─────────────────────┤
│ 1  │ 1st Semester     │ 2026-06-15 23:59:59 │
└────┴──────────────────┴─────────────────────┘

-- New
SELECT * FROM enrollment_config;
┌────┬─────────────┬─────────────────────┐
│ id │ active_term │ deadline            │
├────┼─────────────┼─────────────────────┤
│ 1  │ Term 1      │ 2026-06-15 23:59:59 │
└────┴─────────────┴─────────────────────┘
```

---

## 🎯 Implementation Timeline

| Phase | Date | Action |
|-------|------|--------|
| **Phase 1** | June 1, 2026 | System updates deployed |
| **Phase 2** | June 8, 2026 | School year opens (Term 1 begins) |
| **Phase 3** | June 15, 2026 | Enrollment deadline |
| **Phase 4** | Sept 30, 2026 | Term 1 ends |
| **Phase 5** | Oct 1, 2026 | Term 2 begins |
| **Phase 6** | Dec 31, 2026 | Term 2 ends |
| **Phase 7** | Jan 1, 2027 | Term 3 begins |
| **Phase 8** | Mar 31, 2027 | Term 3 ends |
| **Phase 9** | Apr 8, 2027 | School year ends |

---

## ✅ Compliance Checklist

- [x] 3-term trimester system implemented
- [x] 201 class days per school year
- [x] 2-pathway curriculum structure
- [x] Grade 11-12 structure maintained
- [x] Database schema updated
- [x] API endpoints updated
- [x] Frontend displays updated
- [x] Admin dashboard updated
- [x] Build verified and tested
- [x] Documentation completed

---

## 📞 Support & Questions

For questions about the new term structure or pathway system:
- Contact: admin@inform.edu
- System: INFORM v2.1.0 (Trimester Edition)
- Last Updated: June 1, 2026

---

*This guide ensures INFORM is fully compliant with the Department of Education's SY 2026-2027 requirements.*
