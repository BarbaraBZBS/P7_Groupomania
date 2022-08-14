const express = require( 'express' );
//const cors = require( 'cors' );
//const bodyParser = require( 'body-parser' );
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require( './routes/user' );
const postRoutes = require( './routes/post' );
const User = require( './models/user' );
const Post = require( './models/post' );
const path = require( 'path' );
// const corsOptions = {
//     origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );


app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );
app.use( '/api/auth', userRoutes );
app.use( '/api/posts', postRoutes );

User.hasMany( Post, {
    foreignKey: 'userId'
} );
Post.belongsTo( User, {
    foreignKey: 'userId'
} )

User.sync()
    .then( () => {
        console.log( `Database & users table created!` );
    } );

Post.sync()
    .then( () => {
        console.log( `Database & posts table created!` );
    } );


app.listen( PORT, () => console.log( `Server listening on port ${ PORT }!` ) );
