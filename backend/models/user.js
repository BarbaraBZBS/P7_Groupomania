const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

module.exports = sequelize.define( "user", {
    username: {
        type: DataTypes.STRING, allowNull: false, unique: true,
        // references: {
        //     model: 'post',
        //     key: 'username'
        // }
    },
    email: {
        type: DataTypes.TEXT, allowNull: false, unique: true,
        validate: {
            isEmail: true, notNull: true, notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false
    }
}, {
    timestamps: false,
} );
