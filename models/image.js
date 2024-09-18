'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, {foreignKey: 'user_id'});
      Image.hasMany(models.Review, {foreignKey:'image_id'});
    }
  }
  Image.init({
    caption: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('public', 'private'),
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};