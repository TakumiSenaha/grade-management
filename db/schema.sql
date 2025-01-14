CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  academicYear TEXT NOT NULL,
  semester TEXT NOT NULL,
  dayOfWeek TEXT NOT NULL,
  period TEXT NOT NULL,
  instructor TEXT NOT NULL,
  subjectName TEXT NOT NULL,
  classNumber TEXT NOT NULL,
  credits INTEGER NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  facultyCode TEXT NOT NULL
);
