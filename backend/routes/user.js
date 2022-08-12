const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );

router.get( '/', ( req, res ) => {
    User.findAll()
        .then( ( users ) => {
            res.json( users )
        } )
} );

router.get( '/:id', ( req, res ) => {
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
} );

router.post( '/', async ( req, res ) => {
    try {
        await User.create( { email: req.body.email, password: req.body.password } );
        res.status( 201 ).json( { message: 'user inserted' } );
        console.log( 'success: user created', req.body );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } )
        console.log( 'error: user not created', res.statusCode );
    }
} )

router.put( '/:id', async ( req, res ) => {
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
} );

router.delete( '/:id', function ( req, res ) {
    User.findByPk( req.params.id ).then( function ( user ) {
        user.destroy();
    } )
        .then( ( user ) => {
            res.sendStatus( 200 );
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
} );

module.exports = router;