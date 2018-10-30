CREATE DATABASE project3;
USE project3;

DROP DATABASE project3;

DROP TABLE tasks

SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM sprints;
SELECT * FROM tasks;
SELECT * FROM sprintmemberships;

#returns tasks for a given user, includes sprint and project
SELECT users.first_name AS userName, tasks.name AS taskName, tasks.due_date, tasks.description, sprints.name AS sprint, projects.name AS project
FROM tasks
INNER JOIN users ON tasks.assigned_id = users.id AND users.id=3
LEFT JOIN sprints ON sprints.id = tasks.sprint_id
LEFT JOIN projects on projects.id = sprints.project_id;

#returns all sprints for a given project
SELECT projects.name AS project, sprints.name AS sprint
FROM sprints
INNER JOIN projects ON projects.id = sprints.project_id and projects.id=1;


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

#returns all projects for a given user
SELECT DISTINCT projects.name as project, projects.id, projects.due_date, projects.complete, projects.completed_date, projects.summary, projects.userId
FROM users
INNER JOIN sprintmemberships ON sprintmemberships.userId = users.id AND users.id = 1
INNER JOIN sprints ON sprints.id = sprintmemberships.sprintId
INNER JOIN projects ON sprints.project_id = projects.id
