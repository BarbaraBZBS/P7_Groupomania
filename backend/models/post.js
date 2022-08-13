const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "posts", {
    userId: {
        type: DataTypes.STRING, allowNull: false,
    },
    from: {
        type: DataTypes.STRING, allowNull: false
    },
    title: {
        type: DataTypes.TEXT( 'medium' ), allowNull: true, default: ""
    },
    content: {
        type: DataTypes.TEXT( 'long' ), allowNull: false,
        // validate: {
        //     // isnot: [ "^[a-z0-9]+$", 'i' ] @*=
        // }
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
    usersLiked: [ DataTypes.STRING ],
    usersDisliked: [ DataTypes.STRING ]
}, {
    timestamps: false
} );
