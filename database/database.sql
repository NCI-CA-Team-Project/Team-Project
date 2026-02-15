CREATE DATABASE language_exchange;

USE language_exchange;

CREATE TABLE Users (
	ID varchar(50) PRIMARY KEY,
    Password_hash varchar(255),
    FirstName varchar(50),
    LastName varchar(50),
    Email varchar(50),
    Birthday DATE
);

CREATE TABLE Languages (
	code varchar(30) PRIMARY KEY,
	Language varchar(30)
);

CREATE TABLE User_Languages (
	ID varchar(50),
    code varchar(30),
    type ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
    PRIMARY KEY (ID, code, type),
    FOREIGN KEY (ID) REFERENCES Users(ID) ON DELETE CASCADE,
    FOREIGN KEY (code) REFERENCES Languages(code) ON DELETE CASCADE
);


INSERT INTO Languages (code, Language) VALUES
('en', 'English'),
('fr', 'French'),
('ja', 'Japanese'),
('ro', 'Romanian');


SHOW TABLES;
SELECT * FROM languages;

INSERT INTO Users (ID, Password_hash, FirstName, LastName, Email, Birthday)
VALUES ('test', '1234', 'T', 'E', 't@e.com', '2000-01-01');