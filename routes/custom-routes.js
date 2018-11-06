var db = require('../models');
const encrypt = require("../helper/encrypt.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

module.exports = function(app){
    app.get('/api/users/project/:projectId', (req, res)=> {
        db.sequelize.query(`SELECT DISTINCT Users.email as user_email, Users.id AS user_id, Projects.name as project, Sprints.name AS sprint FROM Users INNER JOIN Tasks ON Tasks.assigned_id = Users.id INNER JOIN Sprints ON Sprints.id = Tasks.sprint_id INNER JOIN Projects on Projects.id = Sprints.project_id AND Projects.id=${req.params.projectId}`, { type: sequelize.QueryTypes.SELECT}).then(dbProjectUsers => {
            res.json(dbProjectUsers)
        })
    });

    //returns all users for a given sprint
    app.get('/api/users/sprint/:sprintId', (req, res)=> {
        db.sequelize.query(`SELECT DISTINCT Users.email as user_email, Users.id AS user_id, Sprints.name AS sprint FROM Users INNER JOIN Tasks ON Tasks.assigned_id = Users.id INNER JOIN Sprints ON Sprints.id = Tasks.sprint_id AND Sprints.id=${req.params.sprintId}`, { type: sequelize.QueryTypes.SELECT}).then(dbSprintUser => {
            res.json(dbSprintUser)
        })
    });

    //returns all projects for a given user
    app.get('/api/projects/user/:userId', (req, res)=> {
      db.sequelize.query(`SELECT DISTINCT Projects.name as project, Projects.id, Projects.due_date, Projects.complete, Projects.completed_date, Projects.summary, Projects.userId FROM Users INNER JOIN SprintMemberships ON SprintMemberships.userId = Users.id AND Users.id = ${req.params.userId}INNER JOIN Sprints ON Sprints.id = SprintMemberships.sprintId INNER JOIN Projects ON Sprints.project_id = Projects.id`, { type: sequelize.QueryTypes.SELECT}).then(dbSprintUser => {
          res.json(dbSprintUser)
      })
  });

  //returns all sprints within a given project that a given user participated in
    app.get('/api/sprints/project/:projectId/user/:userId', (req, res)=> {
      db.sequelize.query(`SELECT Sprints.name AS sprintName, Sprints.id AS sprintId, Sprints.isActive, Sprints.start_date AS startDate, Sprints.end_date AS endDate, Projects.id AS project_id, Users.id AS user_id, Users.first_name FROM Projects INNER JOIN Sprints ON Sprints.project_id = Projects.id AND Projects.id=${req.params.projectId} INNER JOIN SprintMemberships ON Sprints.id = SprintMemberships.sprintId INNER JOIN Users ON Users.id = SprintMemberships.userId AND Users.id=${req.params.userId} ORDER BY endDate DESC`, { type: sequelize.QueryTypes.SELECT}).then(dbSPU => {
          res.json(dbSPU)
      })
    });

    //returns all sprints and tasks by a given userId
    app.get('/api/sprints/tasks/user/:userId', (req, res)=> {
      db.sequelize.query(`SELECT DISTINCT Tasks.name, Tasks.isCompleted, Tasks.id, Tasks.due_date, Tasks.description, Tasks.complexity, Tasks.stack, Users.id AS user_id, Sprints.name AS sprint, Sprints.id AS sprintId FROM Tasks INNER JOIN Sprints ON Sprints.id = Tasks.sprint_id INNER JOIN Users ON Tasks.assigned_id = Users.id AND Users.id=${req.params.userId}`, { type: sequelize.QueryTypes.SELECT}).then(activetasks => {
          res.json(activetasks)
      })
    });

    app.get('/api/projectId/sprint/:sprintId', (req, res)=> {
      db.sequelize.query(`SELECT Projects.id FROM Projects INNER JOIN Sprints ON Sprints.project_id = Projects.id AND Sprints.id=${req.params.sprintId}`, { type: sequelize.QueryTypes.SELECT}).then(projectId => {
          res.json(projectId)
      })
    });






      app.post("/api/login",(req,res) => {
        //find if user exists by mail
        db.User.findOne({where: {email:req.body.email}}).then((userRes) => {
          //if user does not exist
          if(userRes === null){
            res.json("User does not exist.");
          }
          else{
            //we password check.
            if(userRes.password !== req.body.password){
              res.json("Wrong password!");
            }
            else{
              res.json({
                token: userRes.token,
                id: encrypt.encrypt(userRes.token,userRes.id.toString())
              });
            }
          }
        })
    });

    app.post("/api/tokenLogin",(req,res) => {
      db.User.findOne({where: {token:req.body.token}}).then((userRes) => {
        if(userRes === null){
          res.json("No matching token found.");
        }
        else{
          res.json({
            id: encrypt.encrypt(userRes.token,userRes.id.toString())
          });
        }
      });
    });

      app.post("/api/register",(req,res) => {
        console.log(req.body);
        db.User.findOne({where:{email:req.body.email}}).then((userRes) => {
          if(userRes === null){
            db.User.create({
              first_name: req.body.fName,
              last_name: req.body.lName,
              email: req.body.email,
              password: req.body.password,
              token: encrypt.encrypt(req.body.email,req.body.password)
            }).then((data) => {
              let sessionId = encrypt.encrypt(data.token,data.id.toString());
              res.json({
                id: sessionId,
                token: data.token
              });
            });
          }
          else {
            res.json("User already exists!");
          }
        });
      });

      app.post("/api/encrypt",(req,res) => {
        res.json(encrypt.encrypt(req.body.token,req.body.id));
      })

      app.post("/api/decrypt",(req,res) => {
        res.json(encrypt.decrypt(req.body.token,req.body.id));
      });
}
