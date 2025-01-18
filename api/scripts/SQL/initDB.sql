DROP TABLE IF EXISTS "FriendList";
DROP TABLE IF EXISTS "FriendInvitation";
DROP TABLE IF EXISTS "EventPhoto";
DROP TABLE IF EXISTS "Comment";
DROP TABLE IF EXISTS "ParticipantList";
DROP TABLE IF EXISTS "Event";
DROP TABLE IF EXISTS "Account";
DROP TABLE IF EXISTS "Photo";
DROP TABLE IF EXISTS "Location";
DROP TABLE IF EXISTS "Admin";

-- Create Location table
CREATE TABLE "Location" (
    location_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    street TEXT,
    num integer,
    city TEXT,
    code integer,
    country TEXT, 
    position TEXT UNIQUE,
    CONSTRAINT location_composite_unique UNIQUE (street, num, country, city, code)
);

-- Create Photo table
CREATE TABLE "Photo" (
    file_name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
);

INSERT into "Photo"(file_name)
VALUES ('default_pfp.jpg');

-- Create Account table
CREATE TABLE "Account" (
    account_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    birthdate DATE NOT NULL,
    profile_picture INTEGER REFERENCES "Photo"(photo_id) NOT NULL,
    online bool,
    last_online TIMESTAMP,
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

INSERT into "Account"(first_name, last_name, password, email, phone_number, birthdate, profile_picture, online, last_online)
VALUES ('Julien', 'Higginson', '$2b$10$ZgpdT2nPvLJ4X4lCC8MH3uICwG/ohHAKRkWGTns2yeZOOz.V6fNJi', 'j.h.gipson62@gmail.com', '0488221444', '06-01-2004', 1, true, null);

Insert into "Account"(first_name, last_name, password, email, phone_number, birthdate, profile_picture, online, last_online)
Values ('Maxence', 'Dessilly', '$2b$10$ZgpdT2nPvLJ4X4lCC8MH3uICwG/ohHAKRkWGTns2yeZOOz.V6fNJi', 'maxence@gmail.com', '0488221444', '06-01-2004', 1, true, null);
-- The password is generated with Bcrypt and salt=10 "password"

-- Create Admin table
CREATE TABLE "Admin" (
    admin_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

INSERT INTO "Admin" (name, email, password)
VALUES ('Maxence', 'maxence@gmail.com', '$2b$10$ZgpdT2nPvLJ4X4lCC8MH3uICwG/ohHAKRkWGTns2yeZOOz.V6fNJi');

INSERT INTO "Admin" (name, email, password)
VALUES ('Julien', 'j.h.gipson62@gmail.com', '$2b$10$ZgpdT2nPvLJ4X4lCC8MH3uICwG/ohHAKRkWGTns2yeZOOz.V6fNJi');

-- Create FriendList table
CREATE TABLE "FriendList" (
    friend_list_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    friend1_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE,
    friend2_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE,
    date TIMESTAMP NOT NULL,
    CONSTRAINT chk_friend_ids CHECK (friend1_id <> friend2_id)
);

-- Create FriendInvitation table
CREATE TABLE "FriendInvitation" (
    invitation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    sender_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE,
    receiver_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE,
    sent_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_sender_receiver CHECK (sender_id <> receiver_id)
);

-- Create Event table
CREATE TABLE "Event" (
    event_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    location_id INTEGER REFERENCES "Location"(location_id) DEFERRABLE INITIALLY IMMEDIATE,
    author_id INTEGER REFERENCES "Account"(account_id) DEFERRABLE INITIALLY IMMEDIATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    reccurence TEXT,
    -- Has to be changed by an admin
    is_approved BOOLEAN,
    CONSTRAINT chk_reccurence_name CHECK (
        reccurence IN ('weekly', 'bi-weekly', 'daily', 'monthly', 'bi-monthly', 'yearly', 'none')
    )
);

-- Create Participant List table
CREATE TABLE "ParticipantList" (
    account_id INTEGER REFERENCES "Account"(account_id) DEFERRABLE INITIALLY IMMEDIATE,
    event_id INTEGER REFERENCES "Event"(event_id) DEFERRABLE INITIALLY IMMEDIATE,
    PRIMARY KEY (account_id, event_id)
);

-- Create Comment table
CREATE TABLE "Comment" (
    comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    author_id INTEGER REFERENCES "Account"(account_id) DEFERRABLE INITIALLY IMMEDIATE,
    event_id INTEGER REFERENCES "Event"(event_id) DEFERRABLE INITIALLY IMMEDIATE
);

-- Create EventPhoto table
CREATE TABLE "EventPhoto" (
    event_photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    event_id INTEGER REFERENCES "Event"(event_id) DEFERRABLE INITIALLY IMMEDIATE,
    photo_id INTEGER REFERENCES "Photo"(photo_id) DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE "Report" (
    report_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    reporter_id INTEGER REFERENCES "Account"(account_id) DEFERRABLE INITIALLY IMMEDIATE,
    event_reported_id INTEGER REFERENCES "Event"(event_id) DEFERRABLE INITIALLY IMMEDIATE,
    date TIMESTAMP NOT NULL,
    reason TEXT NOT NULL
);