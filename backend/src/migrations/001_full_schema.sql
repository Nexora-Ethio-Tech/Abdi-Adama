-- ============================================================
-- Abdi Adama IMS: Full Schema Migration
-- Run this on your PostgreSQL database via psql or cPanel phpPgAdmin
-- ============================================================

-- ─── EXTENSIONS ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENSURE KEY COLUMNS EXIST ON STUDENTS ───────────────────
ALTER TABLE students ADD COLUMN IF NOT EXISTS section_id INTEGER REFERENCES academic_sections(id);
ALTER TABLE students ADD COLUMN IF NOT EXISTS is_scholarship BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS is_bus_user BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS blood_group VARCHAR(5);
ALTER TABLE students ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS chronic_conditions TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS vaccination_status TEXT DEFAULT 'Unknown';
ALTER TABLE students ADD COLUMN IF NOT EXISTS home_medications TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS risk_level VARCHAR(20) DEFAULT 'Low';
ALTER TABLE students ADD COLUMN IF NOT EXISTS risk_factor TEXT;

-- ─── TEACHERS EXTRA FIELDS ──────────────────────────────────
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS sex VARCHAR(10);
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS background_details TEXT;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS hire_date DATE;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;

-- ─── TEACHER ROLES TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_roles (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  role_type VARCHAR(50) NOT NULL, -- 'room-teacher' | 'examiner' | 'dept-head'
  assigned_section_id INTEGER REFERENCES academic_sections(id) ON DELETE SET NULL,
  exam_title TEXT,
  exam_date DATE,
  exam_time VARCHAR(20),
  exam_location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, role_type)
);

-- ─── TEACHER LOADS (Subject Assignments) ────────────────────
CREATE TABLE IF NOT EXISTS teacher_loads (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES academic_sections(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, section_id, subject)
);

-- ─── SCHEDULES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES academic_sections(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  day VARCHAR(20) NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  branch_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── GRADE ENTRIES ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS grade_entries (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES academic_sections(id),
  subject VARCHAR(100) NOT NULL,
  score_type VARCHAR(50) NOT NULL, -- 'mid', 'final', 'quiz', 'assignment', 'test'
  score NUMERIC(5,2) NOT NULL,
  total NUMERIC(5,2) NOT NULL DEFAULT 100,
  academic_year VARCHAR(20),
  semester VARCHAR(20),
  entered_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COMMUNICATION LOGS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS communication_logs (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id),
  week_ending DATE NOT NULL,
  ratings JSONB NOT NULL DEFAULT '{}',
  teacher_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, week_ending)
);

-- ─── WEEKLY PLANS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weekly_plans (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  content TEXT,
  objectives TEXT,
  teacher_activity TEXT,
  student_activity TEXT,
  time_duration VARCHAR(30),
  teaching_method TEXT,
  teaching_aids TEXT,
  evaluation TEXT,
  remark TEXT,
  status VARCHAR(30) DEFAULT 'Pending',
  dean_feedback TEXT,
  dean_rating INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── WATCHLIST ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS watchlist (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  average_score NUMERIC(5,2),
  flagged_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── EVENTS / NOTICE BOARD ──────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  type VARCHAR(50) DEFAULT 'Event',
  branch_id INTEGER,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INVENTORY ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  condition VARCHAR(50) DEFAULT 'Good',
  location VARCHAR(255),
  branch_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── GRADING CONFIG ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS grading_configs (
  id SERIAL PRIMARY KEY,
  grade_level VARCHAR(20) DEFAULT 'default',
  score_type VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  max_weight INTEGER NOT NULL,
  branch_id INTEGER,
  UNIQUE(grade_level, score_type, branch_id)
);

-- Insert default grading config
INSERT INTO grading_configs (grade_level, score_type, label, max_weight) VALUES
  ('default', 'mid', 'Mid-Exam', 30),
  ('default', 'final', 'Final-Exam', 50),
  ('default', 'quiz', 'Quiz', 10),
  ('default', 'assignment', 'Assignment', 10)
ON CONFLICT (grade_level, score_type, branch_id) DO NOTHING;

-- ─── AUTO-PURGE PAST EVENTS TRIGGER ────────────────────────
CREATE OR REPLACE FUNCTION purge_old_events()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM events WHERE expiry_date IS NOT NULL AND expiry_date < CURRENT_DATE;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_purge_events ON events;
CREATE TRIGGER trg_purge_events
  AFTER INSERT ON events
  FOR EACH ROW EXECUTE FUNCTION purge_old_events();

-- ─── AUTO-UPDATE WATCHLIST TRIGGER ──────────────────────────
CREATE OR REPLACE FUNCTION refresh_watchlist()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO watchlist (student_id, average_score, flagged_at, updated_at)
  SELECT 
    NEW.student_id,
    AVG(CASE WHEN total > 0 THEN (score / total) * 100 ELSE 0 END),
    NOW(),
    NOW()
  FROM grade_entries 
  WHERE student_id = NEW.student_id
  GROUP BY student_id
  HAVING AVG(CASE WHEN total > 0 THEN (score / total) * 100 ELSE 0 END) < 50
  ON CONFLICT (student_id) DO UPDATE 
    SET average_score = EXCLUDED.average_score,
        updated_at = NOW();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_refresh_watchlist ON grade_entries;
CREATE TRIGGER trg_refresh_watchlist
  AFTER INSERT OR UPDATE ON grade_entries
  FOR EACH ROW EXECUTE FUNCTION refresh_watchlist();

-- ─── INDEXES FOR PERFORMANCE ─────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_grade_entries_student ON grade_entries(student_id);
CREATE INDEX IF NOT EXISTS idx_grade_entries_section ON grade_entries(section_id);
CREATE INDEX IF NOT EXISTS idx_schedules_teacher ON schedules(teacher_id);
CREATE INDEX IF NOT EXISTS idx_comm_logs_student ON communication_logs(student_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_watchlist_student ON watchlist(student_id);
