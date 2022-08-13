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
        type: DataTypes.STRING( 60 ), allowNull: false,
        // validate: {
        //     is: [ "^[0-9a-zA-Z]{60}$", 'i' ]
        // }
    }
}, {
    timestamps: false,
}
);
