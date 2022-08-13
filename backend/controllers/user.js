const User = require( '../models/user' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

exports.signup = ( req, res, next ) => {
    bcrypt.hash( req.body.password, 15 )
        .then( hash => {
            User.create( { email: req.body.email, password: hash } )
                .then( () => {
                    res.status( 201 ).json( { message: 'user created' } );
                    console.log( 'success: user created', req.body );
                } )
                .catch( error => res.status( 400 ).json( { error } ) );
            console.log( 'error: user not created', res.statusCode );
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
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '48h' }
                    )
                } );
            } )
            .catch( error => res.status( 500 ).json( { error } ) );
    }
    catch ( error ) {
        res.status( 500 ).json( { error } );
    }
};
