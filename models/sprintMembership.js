module.exports = function(sequelize, DataTypes){
  let SprintMembership = sequelize.define("SprintMembership",{
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  SprintMembership.associate = (models) => {
    SprintMembership.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
    SprintMembership.belongsTo(models.Sprint, {
      foreignKey: {
        name: "sprintId",
        allowNull: false
      }
    })
  }
  return SprintMembership;
}
