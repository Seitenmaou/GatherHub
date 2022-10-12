'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {type: Sequelize.ENUM,values: ['user', 'moderator', 'admin']},
      firstName: {type: Sequelize.STRING},
      lastName: {type: Sequelize.STRING},
      userName: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING},
      passwordHash: {type: Sequelize.STRING},
      title: {type:Sequelize.STRING},
      profession: {type:Sequelize.STRING},
      skillList: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillLevel: {type:Sequelize.ARRAY(Sequelize.SMALLINT)},
      maxSkillLevel: {type:Sequelize.SMALLINT},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};