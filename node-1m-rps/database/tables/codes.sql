create table if not exists codes (
  id SERIAL PRIMARY KEY,
  code CHAR(500) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
