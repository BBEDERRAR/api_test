'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Radios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alias: {
        type: Sequelize.STRING
      },
      allowed_locations: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: undefined
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Radios');
  }
};
