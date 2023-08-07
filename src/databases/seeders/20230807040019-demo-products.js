"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

let data = [];
const now = new Date();

for (let index = 0; index < 50; index++) {
  data.push({
    productName: faker.commerce.product(),
    productPrice: faker.commerce.price({ min: 10000, max: 50000, dec: 0 }),
    picture: null,
    createdAt: now,
    updatedAt: now,
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
