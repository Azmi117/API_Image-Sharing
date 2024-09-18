'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'user_id'});
      Review.belongsTo(models.Image, {foreignKey: 'image_id'});
    }
  }
  Review.init({
    likes: {
      type: DataTypes.ENUM('Yes', 'No')
    },
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};