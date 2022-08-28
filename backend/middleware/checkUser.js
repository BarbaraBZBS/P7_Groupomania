const jwt = require( 'jsonwebtoken' );
const User = require( '../models/user' );

module.exports = ( req, res, next ) => {
    const token = req.cookies.jwt;
    if ( token ) {
        jwt.verify( token, process.env.TOKEN_SECRET, async ( err, decodedToken ) => {
            if ( err ) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findOne( { where: { id: decodedToken.userId } } );
                //console.log( 'user id?:', user.id );
                res.locals.user = user;
                next();
            }
        } );
    } else {
        res.locals.user = null;
        next();
    }
};