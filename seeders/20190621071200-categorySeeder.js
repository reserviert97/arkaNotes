const faker = require('faker')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
    */
      let data = [];

      for (let i = 1; i <= 5; i++) {
        data.push({
          name: faker.random.word(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        
      }
      return queryInterface.bulkInsert('categories', data, {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
