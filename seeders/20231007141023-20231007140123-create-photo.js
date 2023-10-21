'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Photos', [{
      title: 'photo 1',
      caption: 'caption 1',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()


    }, {
      title: 'photo 2',
      caption: 'caption 2',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'photo 3',
      caption: 'caption 3',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    }


    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Photos', null, {});
  }
};
