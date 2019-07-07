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

      for (let i = 1; i <= 4; i++) {
        data.push({
          name: faker.random.word(),
          icon: 'http://cdn.onlinewebfonts.com/svg/img_464408.png',
          createdAt: faker.date.between('2019-01-01', '2019-05-22'),
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
