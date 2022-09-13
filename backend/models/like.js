const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );
const User = require( '../models/user' );
const Post = require( '../models/post' );

const Like = sequelize.define( "like", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    timestamps: false
} );

module.exports = Like;

User.belongsToMany( Post, {
    through: Like,
    foreignKey: 'userId',
    otherKey: 'postId'
} );
Post.belongsToMany( User, {
    through: Like,
    foreignKey: 'postId',
    otherKey: 'userId'
} );
Like.belongsTo( User, {
    foreignKey: 'userId',
    as: 'user'
} );
Like.belongsTo( Post, {
    foreignKey: 'postId',
    as: 'post'
} );

Like.sync()
    .then( () => {
        console.log( `Database & likes table created!` );
    } );