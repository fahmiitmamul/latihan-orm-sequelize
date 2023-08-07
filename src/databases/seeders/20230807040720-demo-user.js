"use strict";
const { faker } = require("@faker-js/faker");
const argon = require("argon2");

/** @type {import('sequelize-cli').Migration} */

let data = [];
const now = new Date();

for (let index = 0; index < 50; index++) {
  data.push({
    fullName: faker.person.fullName(),
    email: "abc@mail.com",
    password: "123",
    createdAt: now,
    updatedAt: now,
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
