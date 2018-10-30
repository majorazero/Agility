var db = require('../models');
const encrypt = require("../helper/encrypt.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

module.exports = function(app) {
    
    app.delete("/api/task/by/:id", function(req, res) {

        console.log(req.params.id)
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        })
          .then(function(dbUser) {
            res.json(dbUser);
          });
      }); 
}