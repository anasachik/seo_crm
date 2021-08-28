-- DROP DATABASE IF EXISTS crm;
-- CREATE DATABASE crm;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    Id_User INT(100) AUTO_INCREMENT NOT NULL,
    Full_Name VARCHAR(121) NOT NULL UNIQUE,
    Company_Name VARCHAR(121),
    Company_Url VARCHAR(121),
    Phone VARCHAR(20),
    Email VARCHAR(80) NOT NULL,
    PRIMARY KEY (Id_User)
);

DROP TABLE IF EXISTS competitor;

CREATE TABLE competitor (
    Id_Competitor INT(100) AUTO_INCREMENT NOT NULL,
    Company_Name VARCHAR(28) NOT NULL,
    Company_Url VARCHAR(28),
    Id_User INT(100),
    PRIMARY KEY (Id_Competitor)
);

DROP TABLE IF EXISTS important_elements;

CREATE TABLE important_elements (
    Id_Important_Element INT(100) AUTO_INCREMENT NOT NULL,
    Date_Update DATETIME,
    Framework VARCHAR(100),
    Domain_Age VARCHAR(100),
    Servers VARCHAR(100),
    CDN VARCHAR(100),
    Hierarchy VARCHAR(100),
    Click_Depth DOUBLE,
    Internal_Link DOUBLE,
    Number_Page DOUBLE,
    Page_Load_Speed DOUBLE,
    Avg_Word_Per_Page DOUBLE,
    Avg_Internal_Link DOUBLE,
    Avg_HTag DOUBLE,
    Domain_Authority DOUBLE,
    Avg_External_Link DOUBLE,
    Number_Referring_Domains DOUBLE,
    Number_Ip DOUBLE,
    Number_Backlinks DOUBLE,
    Publishing_Rate DOUBLE,
    Id_Competitor INT(100),
    Id_User INT(100),
    PRIMARY KEY (Id_Important_Element)
);

DROP TABLE IF EXISTS website_task;

CREATE TABLE website_task (
    Id_Task INT(100) AUTO_INCREMENT NOT NULL,
    Name_Task VARCHAR(100),
    Type_Task VARCHAR(100),
    Checked BOOLEAN,
    Date_Ajoute DATE NOT NULL,
    Date_Expiration DATE NOT NULL,
    Id_User INT(100),
    PRIMARY KEY (Id_Task)
);

DROP TABLE IF EXISTS keyword;

CREATE TABLE keyword (
    Id_Keyword INT(100) AUTO_INCREMENT NOT NULL,
    Name_Keyword VARCHAR(100) UNIQUE,
    Source_Data VARCHAR(100),
    Id_User INT(100),
    PRIMARY KEY (Id_Keyword)
);

DROP TABLE IF EXISTS keyword_update;

CREATE TABLE keyword_update (
    Id_Update INT(100) AUTO_INCREMENT NOT NULL,
    Date_Update DATETIME,
    Number_Search INT(100),
    Google_Position INT(100),
    Bing_Position INT(100),
    Impression INT(100),
    Clicks INT(100),
    Id_Keyword INT(100),
    PRIMARY KEY (Id_Update)
);

DROP TABLE IF EXISTS backlink;

CREATE TABLE backlink (
    Id_BackLink INT(100) AUTO_INCREMENT NOT NULL,
    Name_BackLink VARCHAR(100) UNIQUE,
    Url_BackLink VARCHAR(100),
    Type_BackLink VARCHAR(100),
    Risk_Level VARCHAR(100),
    PRIMARY KEY (Id_BackLink)
);

DROP TABLE IF EXISTS Traitement;

CREATE TABLE Traitement (
    Id_Traitement INT(100) AUTO_INCREMENT NOT NULL,
    Id_Keyword INT(100),
    Id_BackLink INT(100),
    Date_Traitement DATETIME, -- PRIMARY KEY (Id_Keyword_KEYWORD, Id_BackLink_backlink)
    PRIMARY KEY (Id_Traitement)
);

DROP TABLE IF EXISTS keyword_task;

CREATE TABLE keyword_task (
    Id_KewordTask INT(100) AUTO_INCREMENT NOT NULL,
    Name_Task VARCHAR(100),
    Checked BOOLEAN,
    Date_Ajoute DATE NOT NULL,
    Date_Expiration DATE NOT NULL,
    Id_Keyword INT(100),
    PRIMARY KEY (Id_KewordTask)
);

ALTER TABLE
    competitor
ADD
    FOREIGN KEY (Id_User) REFERENCES users (Id_User);

ALTER TABLE
    important_elements
ADD
    FOREIGN KEY (Id_Competitor) REFERENCES competitor (Id_Competitor);

ALTER TABLE
    important_elements
ADD
    FOREIGN KEY (Id_User) REFERENCES users (Id_User);

ALTER TABLE
    website_task
ADD
    FOREIGN KEY (Id_User) REFERENCES users (Id_User);

ALTER TABLE
    keyword
ADD
    FOREIGN KEY (Id_User) REFERENCES users (Id_User);

ALTER TABLE
    keyword_update
ADD
    FOREIGN KEY (Id_Keyword) REFERENCES keyword (Id_Keyword);

ALTER TABLE
    Traitement
ADD
    FOREIGN KEY (Id_Keyword) REFERENCES keyword (Id_Keyword);

ALTER TABLE
    Traitement
ADD
    FOREIGN KEY (Id_BackLink) REFERENCES backlink (Id_BackLink);

ALTER TABLE
    keyword_task
ADD
    FOREIGN KEY (Id_Keyword) REFERENCES keyword (Id_Keyword);