const db = require( '../models/user.model' );
const User = db.user;
//const Op = db.sequelize.Op;

exports.create = ( req, res ) => {
    User.create( { email: req.body.email, password: req.body.password } )
        .then( function ( user ) {
            res.status( 200 ).json( user );
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
}

// app.post( '/users', function ( req, res ) {
//     User.create( { email: req.body.email, password: req.body.password } )
//         .then( function ( user ) {
//             res.status( 200 ).json( user );
//         } )
//         .catch( error => res.status( 400 ).json( { error } ) )
// } );
