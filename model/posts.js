const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class blogPosts extends Model {}

blogPosts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
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
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "posts",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = posts;
