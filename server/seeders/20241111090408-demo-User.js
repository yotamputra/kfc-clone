'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = require('../data/users.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPass(el.password)
    });
    // console.log(data)
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
