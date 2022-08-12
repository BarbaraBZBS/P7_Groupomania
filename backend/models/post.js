const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( 'posts', {
    title: {
        type: DataTypes.TEXT, allowNull: true
    },
    content: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            // isnot: [ "^[a-z0-9]+$", 'i' ] @*=
        }
    },
    image: {
        type: DataTypes.STRING, allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER, default: 0
    },
    dislikes: {
        type: DataTypes.INTEGER, default: 0
    },
    usersLiked: [],
    usersDislikes: []
}, {
    timestamps: false
} );
