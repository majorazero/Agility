module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING, 
        }, 
        email: {
            type: DataTypes.STRING, 
            validate: {
                isEmail: true
            }
        }, 
        password: {
            type: DataTypes.STRING,  
            validate: {
                len: [6,40]
            }
        },
        token: {
            type: DataTypes.STRING, 
        }
    });
    return User;
}