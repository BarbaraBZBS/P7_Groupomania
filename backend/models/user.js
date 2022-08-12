const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "users", {
    email: {
        type: DataTypes.TEXT, allowNull: false,
        unique: true,
        validate: {
            isEmail: true, notNull: true, notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            is: [ "^[a-z0-9]+$", 'i' ]
        }
    }
}, {
    timestamps: false,
}
);
