const User = require( '../models/user' );


exports.getAllUsers = ( req, res ) => {
    User.findAll()
        .then( ( users ) => {
            res.json( users )
        } )
};

exports.getOneUser = ( req, res ) => {
    let { id } = req.params;
    User.findByPk( id )
        .then( ( user ) => {
            if ( user ) {
                res.status( 200 ).json( user )
            } else {
                res.status( 404 ).send();
            }
        } )
        .catch( error => res.status( 404 ).json( { error } ) )
};

exports.createUser = async ( req, res, next ) => {
    try {
        await User.create( { email: req.body.email, password: req.body.password } );
        res.status( 201 ).json( { message: 'user inserted' } );
        console.log( 'success: user created', req.body );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } )
        console.log( 'error: user not created', res.statusCode );
    }
};

exports.modifyUser = async ( req, res ) => {
    try {
        await User.findByPk( req.params.id ).then( ( user ) => {
            user.update( { email: req.body.email, password: req.body.password } )
                .then( ( user ) => {
                    if ( user ) {
                        res.status( 201 ).json( user )
                        console.log( 'success: user updated', req.body )
                    } else {
                        res.status( 404 ).json( { message: "Cet utilisateur n'existe pas" } )
                    }
                } )
        } );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } );
        console.log( 'error: user not updated', res.statusCode )
    }
};

exports.deleteUser = ( req, res ) => {
    User.findByPk( req.params.id ).then( ( user ) => {
        user.destroy();
    } )
        .then( ( user ) => {
            res.sendStatus( 200 );
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};