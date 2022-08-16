const dotenv = require( 'dotenv' );
dotenv.config();
const User = require( '../models/user' );
const Role = require( '../models/role' );

module.exports = ( res, req, next ) => {
    User.findByPk( req.userId ).then( user => {
        user.getRoles().then( roles => {
            for ( let i = 0; i < roles.length; i++ ) {
                if ( roles[ i ].name === "admin" ) {
                    next();
                    return;
                }
            }
            res.status( 403 ).send( {
                message: "Require Admin Role!"
            } );
            return;
        } );
    } );
}