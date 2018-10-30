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
        // db.SprintMembership.findAll({
        //   where: {userId:encrypt.decrypt(req.body.token,req.body.id)},
        //   include:[{model: db.Sprint, as:"Sprint"}]}).then((data2) =>{
        //   console.log(data2[0].Sprint);
        //   res.json(data);
        // });
        res.json(data);
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
            }
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

    app.get("/api/task/assigned/:assignedId", (req, res) => {
        db.Task.findAll({
            where: {
                assigned_id: req.params.assignedId
            }
        }).then(dbSprint => {
            res.json(dbSprint);
        })
    })

    app.get("/api/tasks/users/:userId", (req, res) => {
        db.Task.findAll({
            where: {
                assigned_id: req.params.userId
            }
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
        db.User.findAll({
         where: {
             id: encrypt.decrypt(req.body.token,req.body.id)
         }
        }).then(response => {
            res.json(response);
        })
    });
}
