const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );
dotenv.config();

module.exports = ( req, res, next ) => {
    const token = req.cookies.jwt;
    if ( token ) {
        jwt.verify( token, process.env.TOKEN_SECRET, async ( err, decodedToken ) => {
            if ( err ) {
                console.log( err )
                res.status( 400 ).json( { message: 'No token' } )
            } else {
                console.log( 'decoded id:', decodedToken.userId );
                next();
            }
        } )
    } else {
        console.log( 'no token' )
    }
};
