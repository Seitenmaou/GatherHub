//model for message board, foreign key user id

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messageBoard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  messageBoard.init({
    authorId: {
      type: DataTypes.SMALLINT,
      allowNull:false,
      references: {
        model: 'User',
        key: 'id'
      },
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false
    },
    comment:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    commenterId: {
      type: DataTypes.ARRAY(DataTypes.SMALLINT)
    }
  }, {
    sequelize,
    modelName: 'messageBoard',
  });
  return messageBoard;
};