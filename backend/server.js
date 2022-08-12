const express = require( 'express' );
const User = require( './models/user' );
//const Sequelize = require( 'sequelize' );
const Post = require( './models/post' );
const userRoutes = require( './routes/user' )
//const cors = require( 'cors' );
//const bodyParser = require( 'body-parser' );
const app = express();
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//require( './routes/user.routes' )( app );

app.use( '/api/users', userRoutes );

// sequelize
//     .authenticate()
//     .then( () => {
//         console.log( 'Connection has been established successfully.' );
//     } )
//     .catch( err => {
//         console.error( 'Unable to connect to the database:', err );
//     } );



// User.sync()
//     .then( () => {
//         console.log( `Database & users table created!` );
//     } );




app.listen( PORT, () => console.log( `Server listening on port ${ PORT }!` ) );


//const db = require( './models' );

// //db.sequelize.sync()
//     .then( () => {
//         console.log( "Synced db." );
//     } )
//     .catch( ( error ) => {
//         console.log( 'Failed to sync db: ' + error.message );
//     } );
