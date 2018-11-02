var db = require('../models');
const encrypt = require("../helper/encrypt.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

module.exports = function(app) {
    app.get("/api/user", (req, res) => {
        db.User.findAll({}).then(dbSprint => {
            res.json(dbSprint);
        })
    });

    app.get("/api/project", (req, res) => {
        db.Project.findAll({}).then(dbSprint => {
            res.json(dbSprint);
        })
    });

    app.post("/api/projectOfUser",(req,res)=>{
      db.Project.findAll(
        {where: {userId: encrypt.decrypt(req.body.token,req.body.id)}}
      ).then((data) => {
        console.log(encrypt.decrypt(req.body.token,req.body.id));
        db.sequelize.query(`SELECT DISTINCT projects.name, projects.id, projects.due_date, projects.complete, projects.completed_date, projects.summary, projects.userId FROM users INNER JOIN sprintmemberships ON sprintmemberships.userId = users.id AND users.id = ${encrypt.decrypt(req.body.token,req.body.id)} INNER JOIN sprints ON sprints.id = sprintmemberships.sprintId INNER JOIN projects ON sprints.project_id = projects.id`, { type: sequelize.QueryTypes.SELECT}).then(dbSprintUser => {
            console.log(dbSprintUser);
            let aggregate = JSON.parse(JSON.stringify(data));
            console.log(aggregate);
            for(let i = 0; i < dbSprintUser.length; i++){
              if(aggregate.length === 0){
                aggregate.push(dbSprintUser[i]);
              }
              else{
                for(let j = 0; j < aggregate.length; j++){
                  if(dbSprintUser[i].id === aggregate[j].id){
                    break;
                  }
                  if(j === aggregate.length-1){
                    aggregate.push(dbSprintUser[i]);
                  }
                }
              }
            }
            res.json(aggregate);
        });
      });
    });

    app.post("/api/projectById",(req,res) => {
      db.Project.findAll({
        where: {id: encrypt.decrypt(req.body.token,req.body.id)}
      }).then((data) => {
        res.json(data);
      });
    });

    app.get("/api/sprint/:projectId", (req, res) => {
        db.Sprint.findAll({
            where: {
                project_id:req.params.projectId
            },
            order: [["end_date","DESC"]]
        }).then(dbSprint => {
            res.json(dbSprint);
        })
    });

    app.get("/api/task/:sprintId", (req, res) => {
        db.Task.findAll({
            where: {
                sprint_id: req.params.sprintId
            }
        }).then(dbSprint => {
            res.json(dbSprint);
        })
    });

    app.get("/api/tasks/users/:userId", (req, res) => {
        db.Task.findAll({
            where: {
                assigned_id: req.params.userId
            },
            order: [ ['sprint_id', 'DESC' ] ]
        }).then(dbTasks => {
            res.json(dbTasks);
        })
    });

    app.post("/api/allMemberInSprint", (req,res) => {
      db.SprintMembership.findAll({
        where: {sprintId: req.body.sprintId},
        include: [{
          model: db.User,
          as: "User"
        }]
      }).then((data) => {
        console.log(data,req.body.sprintId);
        res.json(data);
      })
    });

    app.post("/api/allSprintsForMember", (req,res) => {
      db.SprintMembership.findAll({
        where: {userId: req.body.userId},
        include:[{
          model: db.Sprint,
          as: "Sprint"
        }]
      }).then((data) => {
        res.json(data);
      })
    });

    app.post("/api/getuser/", (req, res) => {
        let Obj = {};
        let simpleId = encrypt.decrypt(req.body.token,req.body.id);
        db.User.findAll({
         where: {
          id: simpleId
         }
        }).then(response => {
          Obj.prof = response[0];
          //lets also pull some career data in here.
          db.Task.findAll({
            where: {
              assigned_id: simpleId
            }
          }).then((tRes) => {
            Obj.task = tRes;
            Obj.totalTask = tRes.length;
            Obj.totalCompletedTask = 0;
            //for complexity
            Obj.complexity = 0;
            for(let i = 0; i < tRes.length; i++){
              Obj.complexity += tRes[i].complexity;
              if(tRes[i].isCompleted === true){
                Obj.totalCompletedTask++;
              }
            }
            Obj.complexity = Obj.complexity/tRes.length;
            if(Obj.complexity <= 1.5){
              Obj.compSemantics = "Easy";
            }
            else if (Obj.complexity <= 2.5){
              Obj.compSemantics = "Easy-Medium";
            }
            else if (Obj.complexity <= 3.5){
              Obj.compSemantics = "Medium";
            }
            else if (Obj.complexity <= 4.5){
              Obj.compSemantics = "Medium-Hard";
            }
            else if (Obj.complexity <= 5){
              Obj.compSemantics = "Hard";
            }
            else{
              Obj.compSemantics = "Start doing some tasks, see where you at!";
            }
            db.SprintMembership.findAll({
              where: {
                userId: simpleId
              },
              include:[{
                model: db.Sprint,
                as: "Sprint"
              }]
            }).then((spRes) => {
              Obj.sprintDat = spRes;
              Obj.sprintParticipate = spRes.length;
              Obj.projectContributed = 0;
              let projectCheckArr = [];
              for(let i = 0; i < spRes.length; i++){
                if(!projectCheckArr.includes(spRes[i].Sprint.project_id) === true){
                  projectCheckArr.push(spRes[i].Sprint.project_id);
                  Obj.projectContributed++;
                }
              }
              db.Project.findAll({
                where: {
                  userId: simpleId
                }
              }).then((pRes) => {
                Obj.projectCreated = pRes.length;
                res.json(Obj);
              });
            });
          });
        })
    });
}
