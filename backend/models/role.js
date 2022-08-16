const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "role", {
    name: {
        type: DataTypes.STRING, allowNull: false,
    }
}, {
    timestamps: false,
} );
