var db = require('../models');
// const encrypt = require("../helper/encrypt.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

module.exports = function(app) {

  app.put("/api/task/by/:id/:user", function(req, res) {
      db.Task.update({
          assigned_id: req.params.user
      }, {
          where: {
              id: req.params.id
          }
      })
        .then(function(dbUser) {
          res.json(dbUser);
        });
    });

    app.put("/api/complete/task/:taskId", function(req, res){
      db.Task.update({
        isCompleted: true
      }, {
        where: {
          id: req.params.taskId
        }
      })
      .then(function(dbTask){
        res.json(dbTask)
      })
    })

    app.put("/api/reopen/task/:taskId", function(req, res){
      db.Task.update({
        isCompleted: false
      }, {
        where: {
          id: req.params.taskId
        }
      })
      .then(function(incomplete){
        res.json(incomplete)
      })
    })

    app.put("/api/task/unassign", (req,res) => {
      db.Task.update({
        assigned_id: null
      },{
        where: {
          id: req.body.id
        }
      }).then((data) => {
        res.json(data);
      });
    });

    app.put('/api/sprint/active/:sprintId', (req, res) => {
      db.Sprint.update({
        isActive: req.body}, {
          where: {
            id: req.params.sprintId
          }
        })
    })
}
