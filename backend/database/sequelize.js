const Sequelize = require( 'sequelize' );

module.exports = new Sequelize( {
    dialect: 'sqlite',
    storage: './database.sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
} );