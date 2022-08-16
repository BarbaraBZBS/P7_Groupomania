const User = require( '../models/user' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );
dotenv.config();
const Role = require( '../models/role' );

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,8})$/;


exports.signup = ( req, res, next ) => {
    if ( req.body.email == null || req.body.password == null ) {
        return res.status( 400 ).json( { message: 'missing parameters' } )
    }

    if ( req.body.username.length >= 13 || req.body.username.length <= 4 ) {
        return res.status( 400 ).json( { message: 'username is too short/long (5-12 characters allowed)' } )
    }

    if ( !EMAIL_REGEX.test( req.body.email ) ) {
        return res.status( 400 ).json( { message: 'email is not valid' } )
    }

    if ( !PASSWORD_REGEX.test( req.body.password ) ) {
        return res.status( 400 ).json( { message: 'password invalid (at least one number, one letter, between 4-8 characters)' } )
    }

    bcrypt.hash( req.body.password, 15 )
        .then( hash => {
            User.create( { username: req.body.username, email: req.body.email, password: hash } )
                .then( user => {
                    if ( req.body.roles ) {
                        Role.findAll( { where: { name: req.body.roles } } )
                            .then( roles => {
                                user.setRoles( roles ).then( () => {
                                    res.send( { message: 'User successfully registered' } )
                                } );
                            } );
                    }
                    else {
                        //user role 1
                        user.setRoles( [ 1 ] ).then( () => {
                            res.send( { message: 'User successfully registered' } )
                        } )
                    }
                    // res.status( 201 ).json( { message: 'user created' } );
                    // console.log( 'success: user created', req.body );
                } )
                .catch( error => {
                    res.status( 500 ).send( { message: error.message } )
                } )

            //     .catch( error => res.status( 400 ).json( { error } ) );
            // console.log( 'error: user not created', res.statusCode );
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};


exports.login = async ( req, res, next ) => {
    try {
        const user = await User.findOne( { where: { email: req.body.email } } )
        // console.log( req.body.email )
        // console.log( user )
        if ( !user ) {
            return res.status( 401 ).json( { message: 'identifiant(s) incorrect(s)' } );
        }
        bcrypt.compare( req.body.password, user.password )
            .then( valid => {
                if ( !valid ) {
                    return res.status( 401 ).json( { message: 'identifiant(s) incorrect(s)' } );
                }
                res.status( 200 ).json( {
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '36h' }
                    )
                } );
                const authorities = [];
                user.getRoles().then( roles => {
                    for ( let i = 0; i < roles.length; i++ ) {
                        authorities.push( "ROLE_" + roles[ i ].name.toUpperCase() );
                    }
                    // res.status( 200 ).json( {
                    //     // id: user.id,
                    //     // username: user.username,
                    //     // email: user.email,
                    //     // roles: authorities,
                    //     // //token: token
                    // } );
                } );
            } )
            .catch( error => res.status( 500 ).json( { error } ) );
    }
    catch ( error ) {
        res.status( 500 ).json( { error } );
    }
};
