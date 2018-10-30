var db = require('../models');
const encrypt = require("../helper/encrypt.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

module.exports = function(app){
    app.post("/api/user", function(req, res) {
        db.User.create(req.body)
          .then(function(dbUser) {
            res.json(dbUser);
          });
      });

    app.post("/api/project", function(req, res) {
      console.log(req.body);
      db.Project.create({
        name: req.body.name,
        summary: req.body.summary,
        due_date: req.body.due_date,
        userId: encrypt.decrypt(req.body.token,req.body.id)
      })
          .then(function(dbProject) {
          res.json(dbProject);
          });
    });

    app.post("/api/sprint", function(req, res) {
        db.Sprint.create(req.body)
            .then(function(dbSprint) {
            res.json(dbSprint);
        });
    });

    app.post("/api/sprintMembership", (req,res) => {
      db.SprintMembership.create(req.body)
        .then((membership) => {
          res.json(membership);
        });
    });

    app.post("/api/sprintMembershipWithCode",(req,res)=>{
      let sprintId = encrypt.decrypt("invite",req.body.sId);
      console.log(sprintId);
      db.SprintMembership.find({where:{
        sprintId: sprintId
      }}).then((data) => {
        if(data === null){
          db.SprintMembership.create({
            sprintId: sprintId,
            userId: encrypt.decrypt(req.body.token,req.body.uId)
          }).then((data) => {
            res.json("Created!");
          })
        }
        else{
          res.json("Already a member!");
        }
      });
    })

    app.post("/api/task", function(req, res) {
        db.Task.create(req.body)
            .then(function(dbTask) {
            res.json(dbTask);
        });
    });
}
