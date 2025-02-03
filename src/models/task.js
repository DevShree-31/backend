'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'assignedTo',
        targetKey: 'email'
      });
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending'
    },
    assignedTo: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'email'
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};