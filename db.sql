-- USERS
CREATE TABLE User (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('USER', 'ADMIN') DEFAULT 'USER',
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP
);

-- GENRES
CREATE TABLE Genre (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(255) UNIQUE NOT NULL
);

-- MOVIES
CREATE TABLE Movie (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(255) NOT NULL,
director VARCHAR(255) NOT NULL,
duration int NOT NULL,
poster VARCHAR(255) NOT NULL,
rating DECIMAL(10,2) DEFAULT 4.0,
description TEXT,
genre_id uuid REFERENCES genre(id) NOT NULL,
release_date DATE NOT NULL,
trailer_url VARCHAR(255) ,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP 
);

-- THEATERS
CREATE TABLE Theater (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP 
);

-- ROOMS
CREATE TABLE Room (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
theater_id UUID REFERENCES theater(id) NOT NULL,
name VARCHAR(255) NOT NULL,
seat_count INT NOT NULL,
);

-- SEATS
CREATE TABLE Seat (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
room_id UUID REFERENCES room(id) NOT NULL,
row CHAR(1) NOT NULL,
seat_number INT NOT NULL,
seat_type ENUM('NORMAL', 'VIP') DEFAULT 'NORMAL',
is_active BOOLEAN DEFAULT TRUE,
UNIQUE(room_id, row, seat_number)
);

-- SHOWTIMES
CREATE TABLE Showtime (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
movie_id UUID REFERENCES movie(id),
room_id INT REFERENCES room(id),
start_time TIMESTAMP,
ticket_price DECIMAL(10,2)
);

-- RESERVATIONS
CREATE TABLE Reservation (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES user(id),
showtime_id UUID REFERENCES showtime(id),
status ENUM('CONFIRMED', 'CANCELLED') DEFAULT 'CONFIRMED',
total_price DECIMAL(10,2) NOT NULL
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP,
);

-- RESERVATION_SEATS
CREATE TABLE Reservation_Seat (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
reservation_id UUID REFERENCES reservation(id) ON DELETE CASCADE,
seat_id INT REFERENCES seat(id) NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE Temporary_Lock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user(id) NOT NULL,
  showtime_id UUID REFERENCES showtime(id) NOT NULL,
  seat_id INT REFERENCES seat(id) NOT NULL,
  locked_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);


