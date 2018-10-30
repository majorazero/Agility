module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //year-month-day
        due_date: {
            type: DataTypes.DATEONLY,
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        completed_date: {
            type: DataTypes.DATEONLY
        },
        summary: {
            type: DataTypes.TEXT
        }
    });
    Project.associate = (models) => {
      Project.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false
        }
      });
    }
    return Project;
}
