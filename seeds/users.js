const { getMaxListeners } = require('process');
const sequelize = require('../config/connection');
const { User, blogPost } = require('../model');

const userdata = [
    {
        username: 'test1',
        email: 'test1@gmail.com',
        password: 'testymctesterson1'
    },
    {
        username: 'test12',
        email: 'test12@gmail.com',
        password: 'testymctesterson12'
    },
    {
        username: 'test13',
        email: 'test13@gmail.com',
        password: 'testymctesterson13'
    },
    {
        username: 'test14',
        email: 'test14@gmail.com',
        password: 'testymctesterson14'
    },
    {
        username: 'test15',
        email: 'test15@gmail.com',
        password: 'testymctesterson15'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;