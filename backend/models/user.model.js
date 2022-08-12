const { Sequelize, DataTypes } = require( 'sequelize' );



module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define( 'user', {
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true, validate: {
                isEmail: true, notNull: true, notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING, allowNull: false, validate: {
                is: [ "^[a-z0-9]+$", 'i' ]
            }
        }

    },
        //{timestamps: false}
    );
    return User
};

