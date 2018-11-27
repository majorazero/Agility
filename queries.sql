CREATE DATABASE project3;
USE project3;

DROP DATABASE project3;

DROP TABLE tasks


SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM sprints;
SELECT * FROM tasks;
SELECT * FROM sprintmemberships
WHERE userId=1;

INSERT INTO tasks
(name, description, due_date, sprint_id, assigned_id, complexity, stack, createdAt)
VALUES ("Old task", "this task should not appear on active tasks", "2018-11-25", 25, 4, 3, "React", "2018-11-02 07:11:13", "2018-11-02 07:11:13")

#returns tasks for a given user, includes sprint and project
SELECT DISTINCT tasks.name AS task, tasks.isCompleted AS Complete, users.id AS user_id, sprints.name AS sprint, sprints.id AS sprintId
FROM tasks
INNER JOIN sprints ON sprints.id = tasks.sprint_id
INNER JOIN users ON tasks.assigned_id = users.id AND users.id=1

#returns all sprints for a given project
SELECT projects.name AS project, sprints.name AS sprint, sprints.id AS sprint_id
FROM sprints
INNER JOIN projects ON projects.id = sprints.project_id and projects.id=3;


#returns all users on a given project
SELECT users.email as user_email, projects.name as project, sprints.name
FROM users
INNER JOIN tasks ON tasks.assigned_id = users.id
INNER JOIN sprints ON sprints.id = tasks.sprint_id
INNER JOIN projects on projects.id = sprints.project_id AND projects.id=1;

#returns all tasks for a given project
SELECT tasks.name AS task, tasks.due_date, tasks.assigned_id, sprints.name, projects.name
FROM tasks
INNER JOIN sprints ON sprints.id = tasks.sprint_id
INNER JOIN projects ON projects.id = sprints.project_id and projects.id=1;

#returns projectid for a given task
SELECT projects.id
FROM projects
INNER JOIN sprints ON sprints.project_id = projects.id AND sprints.id=1


#returns all projects for a given user
SELECT DISTINCT projects.name as project, projects.id, projects.due_date, projects.complete, projects.completed_date, projects.summary, projects.userId
FROM users
INNER JOIN sprintmemberships ON sprintmemberships.userId = users.id AND users.id = 1
INNER JOIN sprints ON sprints.id = sprintmemberships.sprintId
INNER JOIN projects ON sprints.project_id = projects.id

SELECT sprints.name AS sprintName, sprints.id AS sprintId, sprints.isActive, sprints.start_date AS startDate, sprints.end_date AS endDate, projects.id AS project_id, users.id AS user_id, users.first_name
FROM projects
INNER JOIN sprints ON sprints.project_id = projects.id AND projects.id=3
INNER JOIN sprintmemberships ON sprints.id = sprintmemberships.sprintId
INNER JOIN users ON users.id = sprintmemberships.userId AND users.id=1

UPDATE tasks
SET name="name", due_date="2018-11-26", description="this task was edited", complexity="2", stack="React"
WHERE id=41

