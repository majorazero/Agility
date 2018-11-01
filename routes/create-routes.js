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

    app.post("/api/sprintMembershipWithCode", (req,res) => {
      console.log(req.body);
      console.log(encrypt.decrypt(req.body.token,req.body.uId),encrypt.decrypt("invite",req.body.sId));
      //res.json("Hit it!");
      db.SprintMembership.findAll({
        where:{
          userId: encrypt.decrypt(req.body.token,req.body.uId),
          sprintId: encrypt.decrypt("invite",req.body.sId)
        }
      }).then((data) => {
        console.log(data.length);
        if(data.length === 0){
          db.SprintMembership.create({
            userId: encrypt.decrypt(req.body.token,req.body.uId),
            sprintId: encrypt.decrypt("invite",req.body.sId)
          }).then((item) => {
            res.json(item);
          });
        }
        else{
          res.json("Already part of sprint!");
        }
      });
    });


    app.post("/api/task", function(req, res) {
        db.Task.create(req.body)
            .then(function(dbTask) {
            res.json(dbTask);
        });
    });
}
