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
}
