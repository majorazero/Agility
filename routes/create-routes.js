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
    db.Project.create(req.body)
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

    app.post("/api/task", function(req, res) {
        db.Task.create(req.body)
            .then(function(dbTask) {
            res.json(dbTask);
        });
    });
}