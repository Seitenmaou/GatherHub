'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    role: {type: DataTypes.ENUM, values: ['user', 'moderator','admin']},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    title: DataTypes.STRING,
    profession: DataTypes.ARRAY(DataTypes.STRING),
    biography: DataTypes.STRING,
    skillList0: DataTypes.ARRAY(DataTypes.STRING),
    skillList1: DataTypes.ARRAY(DataTypes.STRING),
    skillList2: DataTypes.ARRAY(DataTypes.STRING),
    skillList3: DataTypes.ARRAY(DataTypes.STRING),
    skillList4: DataTypes.ARRAY(DataTypes.STRING),
    skillList5: DataTypes.ARRAY(DataTypes.STRING),
    skillLevel: DataTypes.ARRAY(DataTypes.SMALLINT),
    maxSkillLevel: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};