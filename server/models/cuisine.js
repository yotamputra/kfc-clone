'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
      Cuisine.belongsTo(models.User, {
        foreignKey: 'authorId'
      });
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name cannot be empty' },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required' },
        notEmpty: { msg: 'Description cannot be empty' },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price is required' },
        isInt: { msg: 'Price must be an integer' },
        min: {
          args: [1],
          msg: 'Price must be at least 1',
        }
      }
    },
    imgUrl:{
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Image URL is required' },
          notEmpty: { msg: 'Image URL cannot be empty' },
          isUrl: { msg: 'Image URL must be a valid URL' },
        }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category ID is required'},
        isInt: { msg: 'Category ID must be an integer'}
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Author ID is required' },
          isInt: { msg: 'Author ID must be an integer' },
        }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};