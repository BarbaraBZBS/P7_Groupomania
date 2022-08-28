const express = require( 'express' );
const userRoutes = require( './routes/user' );
const postRoutes = require( './routes/post' );
const adminRoutes = require( './routes/admin' );
const refreshRoutes = require( './routes/refreshToken' );
const User = require( './models/user' );
const Post = require( './models/post' );
const Role = require( './models/role' );
const User_Roles = require( './models/user_roles' );
const Like = require( './models/like' );
const path = require( 'path' );
const cors = require( 'cors' );
//const corsOptions = require( './config/corsOptions' );
const errorHandler = require( './middleware/errorHandler' );
const cookieParser = require( 'cookie-parser' );
const requireAuth = require( './middleware/requireAuth' );
const checkUser = require( './middleware/checkUser' );
const app = express();

// app.use( ( req, res, next ) => {
//     // res.setHeader( "Access-Control-Allow-Origin", `${ process.env.CLIENT_URL }` );
//     // res.setHeader(
//     //     "Access-Control-Allow-Headers",
//     //     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     // );
//     // res.setHeader(
//     //     "Access-Control-Allow-Methods",
//     //     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     // );
//     res.setHeader( "Access-Control-Allow-Credentials", "true" );
//     next();
// } );

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: [ "sessionId", "Content-Type" ],
    exposedHeaders: [ "sessionId" ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use( cors( corsOptions ) );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

app.use( cookieParser() );

app.get( '*', checkUser );
app.get( '/jwtid', requireAuth, ( req, res ) => {
    res.status( 200 ).json( res.locals.user.id )
} );

app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );
app.use( '/api/auth', userRoutes );
app.use( '/api/posts', postRoutes );
app.use( '/api/admin/posts', adminRoutes );
app.use( '/refresh', refreshRoutes );

User.hasMany( Post, {
    foreignKey: 'userId',
} );
Post.belongsTo( User, {
    foreignKey: 'userId',
} );
Role.belongsToMany( User, {
    through: "user_roles",
    foreignKey: 'roleId',
    otherKey: 'userId'
} )
User.belongsToMany( Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
} )
User.belongsToMany( Post, {
    through: Like,
    foreignKey: 'userId',
    otherKey: 'postId'
} );
Post.belongsToMany( User, {
    through: Like,
    foreignKey: 'postId',
    otherKey: 'userId'
} );
Like.belongsTo( User, {
    foreignKey: 'userId',
    as: 'user'
} );
Like.belongsTo( Post, {
    foreignKey: 'postId',
    as: 'post'
} );

User.sync()
    .then( () => {
        console.log( `Database & users table created!` );
    } );

Post.sync()
    .then( () => {
        console.log( `Database & posts table created!` );
    } );

Role.sync()
    .then( () => {
        if ( Role.id === null ) {
            initial();
        }
        console.log( `Database & roles table created!` );
    } )
    .catch( error => res.json( error ) )

function initial() {
    Role.create( {
        id: 1,
        name: "user"
    } );

    Role.create( {
        id: 2,
        name: "admin"
    } );
}

User_Roles.sync()
    .then( () => {
        console.log( `Database & user_roles table created!` );
    } );

Like.sync()
    .then( () => {
        console.log( `Database & likes table created!` );
    } );


app.use( errorHandler );

module.exports = app;