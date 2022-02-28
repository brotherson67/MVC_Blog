const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

class blogPosts extends Model {}

blogPosts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "blogPosts",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = blogPosts;
