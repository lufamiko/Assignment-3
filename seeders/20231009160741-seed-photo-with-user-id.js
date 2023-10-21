'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [{
      title: 'photo 1',
      caption: 'caption 1',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2


    }, {
      title: 'photo 2',
      caption: 'caption 2',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    },
    {
      title: 'photo 3',
      caption: 'caption 3',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
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
