-- Users
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  age INT,
  gender VARCHAR(50),
  profession VARCHAR(200),
  disease VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hospitals
CREATE TABLE hospitals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(500),
  type VARCHAR(50),
  charges DECIMAL(10,2)
);

-- Vaccines
CREATE TABLE vaccines (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  price DECIMAL(10,2),
  doses_required INT,
  origin VARCHAR(255),
  side_effects VARCHAR(1000),
  strains_covered VARCHAR(1000)
);

-- Appointments
CREATE TABLE appointments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  hospital_id BIGINT NOT NULL,
  vaccine_id BIGINT NOT NULL,
  appointment_date DATETIME NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  qr_code LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
  FOREIGN KEY (vaccine_id) REFERENCES vaccines(id)
);

-- Payments
CREATE TABLE payments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT NOT NULL,
  amount DECIMAL(10,2),
  method VARCHAR(50),
  status VARCHAR(50),
  transaction_ref VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- Chat messages (store minimal)
CREATE TABLE chat_messages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  room VARCHAR(200),
  sender VARCHAR(200),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
