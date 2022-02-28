const blogPost = require("./blogPosts");
const User = require("./user");
const Comment = require("./comments");

//associations
User.hasMany(blogPost, {
  foreignKey: "user_id",
});

blogPost.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

blogPost.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(blogPost, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  blogPost,
  User,
  Comment,
};
