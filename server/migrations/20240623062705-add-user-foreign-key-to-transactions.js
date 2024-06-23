'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove existing userId column if it exists
    await queryInterface.removeColumn('transactions', 'userId');
    
    // Add new userId column
    await queryInterface.addColumn('transactions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the userId column in reverse migration
    await queryInterface.removeColumn('transactions', 'userId');
  }
};
