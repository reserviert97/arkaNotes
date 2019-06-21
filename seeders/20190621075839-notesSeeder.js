const faker = require('faker')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      
    */

   let data = [];

   for (let i = 1; i <= 30; i++) {
    data.push({
      title: faker.random.words(3),
      content: faker.random.words(6),
      categoryId: faker.random.number({ 'min': 1, 'max': 5 }),
      createdAt: new Date(),
      updatedAt: new Date()
    })
     
   }
   return queryInterface.bulkInsert('notes', data, {});
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
