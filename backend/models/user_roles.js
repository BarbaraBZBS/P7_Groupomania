const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "user_roles", {
    roleId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'role',
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
} )