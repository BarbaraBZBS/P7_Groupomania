const allowedRoles = require( '../config/allowedRoles' )

const verifyRoles = () => {
    return ( req, res, next ) => {
        if ( !req?.role ) return res.sendStatus( 401 );
        const result = () => { allowedRoles.includes( req.role ).find( val => val === true ) }
        if ( !result ) return res.sendStatus( 401 );
        next();
    }
}

module.exports = verifyRoles