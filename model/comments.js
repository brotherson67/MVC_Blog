const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogPosts", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "comment",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Comment;
