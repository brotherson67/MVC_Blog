const { Post } = require("../models");

const postdata = [
  {
    id: 2,
    title: "Donec posuere metus vitae ipsum.",
    contents: "https://tryhackme.com/",
    user_id: 10,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
