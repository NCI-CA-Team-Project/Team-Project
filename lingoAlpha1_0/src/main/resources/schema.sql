CREATE TABLE users (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50),
    Password_hash VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Birthday DATE
) ENGINE=InnoDB;


-- LANGUAGES TABLE
CREATE TABLE languages (
    code VARCHAR(30) PRIMARY KEY,
    Language VARCHAR(30) NOT NULL
) ENGINE=InnoDB;


-- USER_LANGUAGES TABLE
CREATE TABLE user_languages (
    ID BIGINT,
    code VARCHAR(30),
    type ENUM('A1','A2','B1','B2','C1','C2'),
    
    PRIMARY KEY (ID, code, type),
    
    CONSTRAINT fk_user
        FOREIGN KEY (ID) 
        REFERENCES users(ID)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_language
        FOREIGN KEY (code) 
        REFERENCES languages(code)
        ON DELETE CASCADE
) ENGINE=InnoDB;