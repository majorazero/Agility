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
        isComplete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
    });
    Sprint.associate = (models) => {
      Sprint.belongsTo(models.Project, {
        foreignKey: {
          name: "project_id",
          allowNull: false
        }
      });
    }
    return Sprint;
}
