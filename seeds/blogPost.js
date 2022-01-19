const sequelize = require('../config/connection');
const { User, blogPost } = require('../model');

const blogPostData = [
    {
        title: 'Nulla ut erat id mauris vulputate elementum.',
        post_body: 'python is a cool language ',
        user_id: 1
    },
    {
        title: 'plkasdjf;lkaj ut erat id mauris vulputate elementum.',
        post_body: 'PHP is a cool language ',
        user_id: 2
    },
    {
        title: 'kajds;fglkasjhd;flkjas;dlkjfa; ut erat id mauris vulputate elementum.',
        post_body: 'Clojure is a cool language ',
        user_id: 1
    },
    {
        title: 'Nulla ut ;laskdjfg;lkasjdg;flkajsd;lfkjrat id mauris vulputate elementum.',
        post_body: 'CODING is a cool language ',
        user_id: 4
    }
];

const seedPosts = () => blogPost.bulkCreate(blogPostData);

module.exports = seedPosts;