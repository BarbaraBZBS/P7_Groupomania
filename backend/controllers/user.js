const User = require( '../models/user' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );
dotenv.config();
const Role = require( '../models/role' );

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;


exports.signup = ( req, res, next ) => {
    if ( req.body.email == null || req.body.password == null ) {
        return res.status( 400 ).json( { message: 'paramètres manquants' } )
    }

    if ( req.body.username.length >= 11 || req.body.username.length <= 4 ) {
        return res.status( 400 ).json( { message: 'nom utilisateur trop court ou trop long (5 à 10 charactères autorisés)' } )
    }

    if ( !EMAIL_REGEX.test( req.body.email ) ) {
        return res.status( 400 ).json( { message: 'email non valide' } )
    }

    if ( !PASSWORD_REGEX.test( req.body.password ) ) {
        return res.status( 400 ).json( { message: 'mot de passe invalide (au moins un nombre et une lettre, 6 à 15 charactères)' } )
    }

    bcrypt.hash( req.body.password, 15 )
        .then( hash => {
            User.create( { username: req.body.username, email: req.body.email, password: hash } )
                .then( user => {
                    if ( req.body.role ) {
                        user.update( {
                            role: req.body.role
                        } )
                        Role.findAll( { where: { name: req.body.role } } )
                            .then( role => {
                                user.setRoles( role ).then( () => {
                                    res.send( { message: 'Utilisateur enregistré avec succès' } )
                                } );
                            } );
                    }
                    else {
                        //user role 1
                        user.update( {
                            role: "user"
                        } )
                        user.setRoles( [ 1 ] ).then( () => {
                            res.send( { message: 'Utilisateur enregistré avec succès' } )
                        } )
                    }
                } )
                .catch( error => {
                    res.status( 500 ).send( { message: error.message } )
                } )
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};


exports.login = async ( req, res, next ) => {
    const maxAge = 3 * 24 * 60 * 60 * 1000;
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

                const token = jwt.sign(
                    { userId: user.id, role: user.role },
                    process.env.TOKEN_SECRET,
                    { expiresIn: maxAge }
                )
                res.cookie( 'jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 } )

                res.status( 200 ).json( {
                    userId: user.id,
                    role: user.role,
                    token: jwt.sign(
                        { userId: user.id, role: user.role },
                        process.env.TOKEN_SECRET,
                        { expiresIn: maxAge }
                    ),
                } );
                console.log( user.role )

                const authorities = [];
                user.getRoles().then( roles => {
                    for ( let i = 0; i < roles.length; i++ ) {
                        authorities.push( "ROLE_" + roles[ i ].name.toUpperCase() );
                    }
                    console.log( authorities )
                } );
            } )
            .catch( error => res.status( 500 ).json( { error } ) );
    }
    catch ( error ) {
        res.status( 500 ).json( { error } );
    }
};

exports.logout = async ( req, res ) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if ( !cookies?.jwt ) return res.sendStatus( 204 ); //No content
    const token = cookies.jwt;
    const user = await User.findOne( { token } )
    if ( !user ) {
        res.clearCookie( 'jwt', { httpOnly: true, sameSite: 'None', secure: true } );
        return res.sendStatus( 204 );
    }
    user.update( { token: '' } )
    console.log( token );
    res.clearCookie( 'jwt', { httpOnly: true, sameSite: 'None', secure: true } );
    res.sendStatus( 204 );
};

exports.getAllUsers = ( req, res, next ) => {
    User.findAll()
        .then( ( users ) => {
            if ( users ) {
                res.status( 200 ).json( users )
            }
            else {
                res.status( 404 ).json( { message: 'No users found' } )
            }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};

exports.getOneUser = async ( req, res, next ) => {
    await User.findByPk( req.params.id )
        .then( ( user ) => {
            if ( user ) {
                res.status( 200 ).json( user )
            }
            else {
                res.status( 404 ).json( { message: 'User not found' } )
            }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
}

exports.updateUser = async ( req, res, next ) => {
    await User.findByPk( req.params.id )
        .then( ( user ) => {
            if ( !user ) {
                res.status( 404 ).json( { message: 'User not found' } )
            }
            else {
                user.update( { username: req.body.username } )
                    .then( () => {
                        console.log( req.body.username )
                        res.status( 200 ).json( { message: 'Success: username modified !' } )
                    } )
                    .catch( error => res.status( 409 ).json( { message: 'Nom déja utilisé !' } ) )
            }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
}

exports.deleteUser = async ( req, res, next ) => {
    await User.findByPk( req.params.id )
        .then( ( user ) => {
            if ( !user ) {
                res.status( 404 ).json( { message: 'User not found' } )
            }
            else {
                user.destroy()
                    .then( () => res.status( 200 ).json( { message: 'Success: user deleted !' } ) )
                    .catch( error => res.status( 400 ).json( { error } ) )
            }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
}
