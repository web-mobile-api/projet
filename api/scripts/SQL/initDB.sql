DROP table if exists `Event`;
DROP table if exists `Location`;
DROP table if exists `ParticipantList`;
DROP table if exists `Comment`;
DROP table if exists `Photo`;
DROP table if exists `Account`;
DROP table if exists `FriendList`;
DROP table if exists `UpVote`;


Create table Location (
	id INT PRIMARY KEY AUTO_INCREMENT,
    address VarChar(200) NOT NULL,
    position VarChar(100)
);

Create table `Account` (
	id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VarChar(25) NOT NULL,
    last_name VarChar(25) NOT NULL,
    password VarChar(60) NOT NULL,
    email VarChar(50) NOT NULL,
    phone_number VarChar(15) NOT NULL,
	birthdate DATE NOT NULL,
	CONSTRAINT CHK_email_format CHECK (email LIKE '%_@_%.__%')
);

Create table FriendList (
	id INT PRIMARY KEY AUTO_INCREMENT,
    friend1 INT NOT NULL,
    friend2 INT NOT NULL,
    date_ DATE NOT NULL,
    FOREIGN KEY (friend1) REFERENCES Account(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (friend2) REFERENCES Account(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT UC_friend1_friend2 UNIQUE (friend1, friend2)
);

Create table `Event` (
	id INT PRIMARY KEY AUTO_INCREMENT,
    location INT NOT NULL,
	author INT NOT NULL,
    name_ VarChar(25) NOT NULL,
    date_ DATE NOT NULL,
    reccurence VarChar(10) NOT NULL,
    FOREIGN KEY (location) REFERENCES Location(id),
    FOREIGN KEY (author) REFERENCES Account(id),
     CONSTRAINT CHK_rank_name CHECK (
		reccurence IN ('weekly', 'bi-weekly', 'daily', 'monthly', 'bi-monthly', 'yearly')	
	)
);

Create table `Comment` (
	id INT PRIMARY KEY AUTO_INCREMENT,
    content VarChar(500) NOT NULL,
    date_ DATE NOT NULL,
    author INT NOT NULL,
	FOREIGN KEY (author) REFERENCES Account(id)
);

Create table Photo (
	path VarChar(200) NOT NULL,
	id INT PRIMARY KEY AUTO_INCREMENT,
    event_ INT NOT NULL,
	FOREIGN KEY (event_) REFERENCES Event(id)
);


