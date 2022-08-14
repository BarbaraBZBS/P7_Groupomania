const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "user", {
    email: {
        type: DataTypes.TEXT, allowNull: false, unique: true,
        validate: {
            isEmail: true, notNull: true, notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING( 60 ), allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN, default: false, allowNull: false
    }
}, {
    timestamps: false,
} );
