const sequelize = require( '../database/sequelize' );
const DataTypes = require( 'sequelize' );
const bcrypt = require( 'bcrypt' );
const Post = require( '../models/post' );
const Role = require( '../models/role' );
const User_Roles = require( '../models/user_roles' )


const User = sequelize.define( "user", {
    username: {
        type: DataTypes.STRING, allowNull: false, unique: true,
    },
    email: {
        type: DataTypes.TEXT, allowNull: false, unique: true,
        validate: {
            isEmail: true, notNull: true, notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false
    },
    role: {
        type: DataTypes.STRING, default: "user"
    }
}, {
    timestamps: false,
} );

module.exports = User;

( async () => {
    await User.sync( { force: false } )
    console.log( `Database & users table created!` );
    User.findOne( { Where: { email: "admin@groupomania.com" } } )
        .then( ( user ) => {
            if ( !user ) {
                console.log( "Compte admin inexistant !" );
                bcrypt
                    .hash( process.env.ADMINPASS, 15 )
                    .then( ( hash ) => {
                        User.create( {
                            username: "Gr-Admin",
                            email: "admin@groupomania.com",
                            password: hash,
                            role: "admin",
                        } )
                            .then( ( user ) => {
                                Role.findOne( { where: { name: user.role } } )
                                    .then( ( role ) => {
                                        User_Roles.create( {
                                            roleId: role.id,
                                            userId: user.id
                                        } )
                                        //res.status( 200 ).json( { message: "Success: admin created !" } );
                                        console.log( "Compte admin créé !" );
                                    } )
                                    .catch( error => console.log( error ) )
                            } )
                            .catch( ( error ) => {
                                console.log( "Compte admin NON créé !" );
                                //res.status(401).json({ message: "Admin non créé !" });
                            } );
                    } )
                    .catch( ( error ) => {
                        console.log( "Erreur Hash MDP !" );
                    } );
            } else {
                console.log( "Compte admin déjà existant !" );
            }
        } );
} )();

User_Roles.sync()
    .then( () => {
        console.log( `Database & user_roles table created!` );
    } );
