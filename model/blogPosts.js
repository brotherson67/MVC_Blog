const { DATE } = require('mysql/lib/protocol/constants/types');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class blogPosts extends Model {}

blogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            // add a default value of current date
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'blogPosts'
    }
)

module.exports = blogPosts;