//database migration for users

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
      profession: {type:Sequelize.ARRAY(Sequelize.STRING)},
      biography: {type:Sequelize.STRING},
      skillList0: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillList1: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillList2: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillList3: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillList4: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillList5: {type:Sequelize.ARRAY(Sequelize.STRING)},
      skillLevel: {type:Sequelize.ARRAY(Sequelize.SMALLINT)},
      maxSkillLevel: {type:Sequelize.SMALLINT},
      isOnline:{type:Sequelize.BOOLEAN},
      hubPosition:{type:Sequelize.ARRAY(Sequelize.SMALLINT)},
      favorites:{type:Sequelize.ARRAY(Sequelize.SMALLINT)},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};