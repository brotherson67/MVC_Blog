const blogPost = require('./blogPosts')
const User = require('./user');

//associations
User.hasMany(blogPost, {
    foreignKey: 'user_id'
});

blogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

module.exports = {
    blogPost,
    User
}