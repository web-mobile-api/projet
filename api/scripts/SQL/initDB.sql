DROP TABLE IF EXISTS "Photo";
DROP TABLE IF EXISTS "Event";
DROP TABLE IF EXISTS "Location";
DROP TABLE IF EXISTS "ParticipantList";
DROP TABLE IF EXISTS "Comment";
DROP TABLE IF EXISTS "FriendList";
DROP TABLE IF EXISTS "Account";
DROP TABLE IF EXISTS "UpVote";

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

-- Create Account table
CREATE TABLE "Account" (
    account_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    birthdate DATE NOT NULL,
    CONSTRAINT chk_email_format CHECK (email LIKE '%_@_%.__%')
);

INSERT into "Account"(first_name, last_name, password, email, phone_number, birthdate)
VALUES ('Julien', 'Higginson', 'password-password', 'J.H.Gipson62@gmail.com', '0488221444', '06-01-2004');

-- Create FriendList table
CREATE TABLE "FriendList" (
    friend_list_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    friend1_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
    friend2_id INTEGER REFERENCES "Account"(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
    date_ DATE NOT NULL,
    CONSTRAINT chk_friend_ids CHECK (friend1_id <> friend2_id)
);

-- Create Event table
CREATE TABLE "Event" (
    event_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    position_id INTEGER REFERENCES "Location"(location_id),
    author_id INTEGER REFERENCES "Account"(account_id),
    name_ TEXT NOT NULL,
    date_ DATE NOT NULL,
    reccurence TEXT NOT NULL,
    CONSTRAINT chk_reccurence_name CHECK (
        reccurence IN ('weekly', 'bi-weekly', 'daily', 'monthly', 'bi-monthly', 'yearly')
    )
);

-- Create Comment table
CREATE TABLE "Comment" (
    comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    date_ DATE NOT NULL,
    author_id INTEGER REFERENCES "Account"(account_id)
);

-- Create Photo table
CREATE TABLE "Photo" (
    path TEXT NOT NULL,
    photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    event_id INTEGER REFERENCES "Event"(event_id)
);