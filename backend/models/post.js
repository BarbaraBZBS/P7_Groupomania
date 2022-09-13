const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

const Post = sequelize.define( "post", {
    title: {
        type: DataTypes.TEXT, allowNull: true, defaultValue: ""
    },
    content: {
        type: DataTypes.TEXT, allowNull: false
    },
    image: {
        type: DataTypes.STRING, allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER, defaultValue: 0
    }
} );

Post.sync()
    .then( () => {
        console.log( `Database & posts table created!` );
    } );

module.exports = Post;