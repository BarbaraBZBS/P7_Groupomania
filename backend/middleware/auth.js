const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );
dotenv.config();
const User = require( '../models/user' );

module.exports = ( req, res, next ) => {
    try {
        const token = req.headers.authorization.split( ' ' )[ 1 ];
        const decodedToken = jwt.verify( token, process.env.TOKEN_SECRET );
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch ( error ) {
        res.status( 401 ).json( { error } );
    };
};




// verifyToken = ( req, res, next ) => {
//     let token = req.headers[ "x-access-token" ];
//     if ( !token ) {
//         return res.status( 403 ).send( {
//             message: "No token provided!"
//         } );
//     }
//     jwt.verify( token, config.secret, ( err, decoded ) => {
//         if ( err ) {
//             return res.status( 401 ).send( {
//                 message: "Unauthorized!"
//             } );
//         }
//         req.userId = decoded.id;
//         next();
//     } );
// };
// isAdmin = ( req, res, next ) => {
//     User.findByPk( req.userId ).then( user => {
//         user.getRoles().then( roles => {
//             for ( let i = 0; i < roles.length; i++ ) {
//                 if ( roles[ i ].name === "admin" ) {
//                     next();
//                     return;
//                 }
//             }
//             res.status( 403 ).send( {
//                 message: "Require Admin Role!"
//             } );
//             return;
//         } );
//     } );
// };
// isModerator = ( req, res, next ) => {
//     User.findByPk( req.userId ).then( user => {
//         user.getRoles().then( roles => {
//             for ( let i = 0; i < roles.length; i++ ) {
//                 if ( roles[ i ].name === "moderator" ) {
//                     next();
//                     return;
//                 }
//             }
//             res.status( 403 ).send( {
//                 message: "Require Moderator Role!"
//             } );
//         } );
//     } );
// };
// isModeratorOrAdmin = ( req, res, next ) => {
//     User.findByPk( req.userId ).then( user => {
//         user.getRoles().then( roles => {
//             for ( let i = 0; i < roles.length; i++ ) {
//                 if ( roles[ i ].name === "moderator" ) {
//                     next();
//                     return;
//                 }
//                 if ( roles[ i ].name === "admin" ) {
//                     next();
//                     return;
//                 }
//             }
//             res.status( 403 ).send( {
//                 message: "Require Moderator or Admin Role!"
//             } );
//         } );
//     } );
// };
// const authJwt = {
//     verifyToken: verifyToken,
//     isAdmin: isAdmin,
//     isModerator: isModerator,
//     isModeratorOrAdmin: isModeratorOrAdmin
// };







// try {
//     const token = req.headers.authorization.split( ' ' )[ 1 ];
//     const decodedToken = jwt.verify( token, process.env.TOKEN_SECRET );
//     const userId = decodedToken.userId;
//     req.auth = {
//         userId: userId
//     };
//     console.log( 'admin ?', isAdmin )
//     next();
// } catch ( error ) {
//     res.status( 401 ).json( { error } );
// };
// const isAdmin = async ( req, res, next ) => {
//     if ( !req.user.isAdmin )
//         return res.status( 401 ).send( { message: 'Not allowed' } );
//     next();
// }
