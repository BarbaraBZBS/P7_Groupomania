const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

const User_Roles = sequelize.define( "user_roles", {
    id: {
        type: DataTypes.INTEGER,
        allowNulle: false,
        primaryKey: true,
        autoIncrement: true
    },
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
} );

module.exports = User_Roles;

