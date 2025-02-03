'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending'
      },
      assignedTo: {
        type:Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Tasks', {
      fields: ['assignedTo'],
      type: 'foreign key',
      name: 'fk_assigned_to_email',
      references: {
        table: 'Users',
        field: 'email'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Tasks', 'fk_assigned_to_email');
    await queryInterface.dropTable('Tasks');
  }
};