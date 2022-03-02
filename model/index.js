const posts = require("./posts");
const User = require("./user");
const Comment = require("./comments");

//associations
User.hasMany(posts, {
  foreignKey: "user_id",
});

posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

posts.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(posts, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  posts,
  User,
  Comment,
};
