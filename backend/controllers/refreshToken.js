const User = require( '../models/user' );
const jwt = require( 'jsonwebtoken' );

const handleRefreshToken = async ( req, res ) => {
    const cookies = req.cookies;
    if ( !cookies?.jwt ) return res.sendStatus( 401 );
    const refreshToken = cookies.jwt;

    const user = await User.findOne( { refreshToken } );
    if ( !user ) return res.sendStatus( 403 ); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        ( err ) => {
            if ( err ) return res.sendStatus( 403 );
            //const role = user.role //Object.values( user.roles );
            const token = jwt.sign(
                { userId: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: '15s' }
            );
            res.json( { token } ) //role,
        }
    );
}

module.exports = { handleRefreshToken }