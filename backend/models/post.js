const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "post", {
    title: {
        type: DataTypes.TEXT, allowNull: true, default: ""
    },
    content: {
        type: DataTypes.TEXT, allowNull: false
    },
    image: {
        type: DataTypes.STRING, allowNull: true
    }
}, {
    timestamps: false
} );
