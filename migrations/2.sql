
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  is_confirmed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_email ON appointments(email);
CREATE INDEX idx_appointments_status ON appointments(status);
