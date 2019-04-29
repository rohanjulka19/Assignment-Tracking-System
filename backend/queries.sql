
use data ;

/*Student  - regno , name , class(branch + sem) , sec , password*/

CREATE TABLE Student (
    regno CHAR(9) NOT NULL,
    name VARCHAR(255) NOT NULL,
    class VARCHAR(10) NOT NULL ,
    sec CHAR(1) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (regno)
);

/* Teacher - id , name , password */

CREATE TABLE Teacher (
    id VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
); 

/* Subject - course_code , name */

CREATE TABLE Subject (
    course_code CHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (course_code)
); 

/* Subject_alloted - subject_course_code ,teacher_id , class , sec  */

CREATE TABLE Subject_alloted (
    subject_course_code CHAR(5) NOT NULL,
    teacher_id VARCHAR(255) NOT NULL,
    class VARCHAR(10) NOT NULL ,
    sec CHAR(1) NOT NULL
); 

/* Assignment - id , name ,subject_course_code , teacher_id , issue_date , submission_date , class , sec , assignment_url  */

CREATE TABLE Assignment (
    id CHAR(6) NOT NULL,
    name VARCHAR(255) NOT NULL,
    subject_course_code CHAR(5) NOT NULL,
    teacher_id VARCHAR(255) NOT NULL,
    issue_date date NOT NULL,
    submission_date date NOT NULL,
    class VARCHAR(10) NOT NULL ,
    sec CHAR(1) NOT NULL,
    assignment_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
); 

/* Assignment_submissions - assignment_id , student_regno , marks  , submission_url */

CREATE TABLE Assignment_submissions (
    assignment_id CHAR(6) NOT NULL,
    student_regno CHAR(9) NOT NULL,
    marks TINYINT NOT NULL, 
    submission_url VARCHAR(255) NOT NULL
); 

INSERT INTO Teacher (id,name,password) VALUES ("123456","Teacher1","pass");