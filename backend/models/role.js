const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );

const Role = sequelize.define( "role", {
    name: {
        type: DataTypes.STRING, allowNull: false,
    }
}, {
    timestamps: false,
} );

module.exports = Role;

Role.sync( { force: true } )
    .then( async () => {
        await initial();
        console.log( `Database & roles table created!` );
    } )
    .catch( error => console.log( error ) )

async function initial() {
    await Role.create( {
        id: 1,
        name: "user"
    } );
    await Role.create( {
        id: 2,
        name: "admin"
    } );
};
