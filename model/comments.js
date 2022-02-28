const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init({
  id: {},
  commentText: {},
  user_id: {},
  post_id: {},
});

module.exports = Comment;
