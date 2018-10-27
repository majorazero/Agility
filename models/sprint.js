module.exports = function(sequelize, DataTypes) {
    var Sprint = sequelize.define("Sprint", {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY
        }, 
        end_date: {
            type: DataTypes.DATEONLY 
        }, 
        project_id: {
            type: DataTypes.INTEGER
        }
    });
    return Sprint;
}