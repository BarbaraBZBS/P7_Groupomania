const dbConfig = require( '../config/db.config.js' );
const { Sequelize, DataTypes } = require( 'sequelize' );

const sequelize = new Sequelize( {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
} );

// sequelize
//     .authenticate()
//     .then( () => {
//         console.log( 'Connection has been established successfully.' );
//     } )
//     .catch( err => {
//         console.error( 'Unable to connect to the database:', err );
//     } );


const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require( './user.model.js' )( sequelize, Sequelize );


module.exports = db;

