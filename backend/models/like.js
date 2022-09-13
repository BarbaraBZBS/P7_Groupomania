const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

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

Like.sync()
    .then( () => {
        console.log( `Database & likes table created!` );
    } );
