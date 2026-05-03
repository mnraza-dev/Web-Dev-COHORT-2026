-- LEFT JOIN
-- RIGHT JOIN
-- INNER JOIN
-- FULL OUTER JOIN
--
DROP TABLE students;
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    branch VARCHAR(50)
);
--
CREATE TABLE internship (
    internship_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    stipend INT CHECK (stipend > 1000),
    status VARCHAR(20),
    student_id INT REFERENCES students(student_id) ON DELETE RESTRICT
);
--
--
-- ON DELETE RESTRICT
-- ON DELETE CASCADE
-- ON DELETE SET NULL
--
--
CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    avatar_url VARCHAR(100),
    student_id INT REFERENCES students(student_id)
) --
INSERT INTO students (name, email, branch)
VALUES
('Raza Khan', 'raza@gmail.com', 'CSE'),
('Aman Verma', 'aman@gmail.com', 'IT'),
('Priya Sharma', 'priya@gmail.com', 'ECE'),
('Rahul Singh', 'rahul@gmail.com', 'CSE'),
('Sneha Gupta', 'sneha@gmail.com', 'EEE'),
('Arjun Mehta', 'arjun@gmail.com', 'IT'),
('Neha Jain', 'neha@gmail.com', 'CSE'),
('Karan Patel', 'karan@gmail.com', 'ME'),
('Anjali Roy', 'anjali@gmail.com', 'ECE'),
('Vikas Yadav', 'vikas@gmail.com', 'CSE');
--
INSERT INTO internship (company_name, role, stipend, status, student_id)
VALUES
('HCL', 'Support Intern', 142000, 'completed', 16),
('Infosys', 'Testing Intern', 113000, 'ongoing', 15),
('Amazon', 'Backend Intern', 410000, 'completed', 14),
('Microsoft', 'Data Intern', 302000, 'ongoing', 12),
('Github', 'Frontend Intern', 228000, 'completed', 12),
('Akamai', 'Android Intern', 235000, 'ongoing', 11);
--
--

SELECT *
FROM internship;
--
--
SELECT 
students.name,
students.branch,
internship.company_name,
internship.stipend
FROM students 
INNER JOIN internship 
ON students.student_id = internship.student_id;
--
--
--