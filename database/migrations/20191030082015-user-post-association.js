'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn('posts', 'photo', { type: Sequelize.STRING }, { transaction: t}),
        queryInterface.addColumn('posts', 'userId', { type: Sequelize.INTEGER }, { transaction: t})
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn('posts', 'photo', { transaction: t}),
        queryInterface.removeColumn('posts', 'userId', { transaction: t})
      ]);
    });
  }
};
