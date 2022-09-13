const express = require( 'express' );
const helmet = require( 'helmet' );
const rateLimit = require( 'express-rate-limit' );
const path = require( 'path' );
const cors = require( 'cors' );
const cookieParser = require( 'cookie-parser' );
//routes
const userRoutes = require( './routes/user' );
const postRoutes = require( './routes/post' );
//models
const User = require( './models/user' );
const Post = require( './models/post' );
const Like = require( './models/like' );
const Role = require( './models/role' );
//middleware
const errorHandler = require( './middleware/errorHandler' );
const requireAuth = require( './middleware/requireAuth' );
const checkUser = require( './middleware/checkUser' );
const app = express();

//cors options for headers
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: [ "sessionId", "Content-Type" ],
    exposedHeaders: [ "sessionId" ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use( cors( corsOptions ) );

//parser and cookies handle
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( cookieParser() );

//security - requests limiter and headers settings
const limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 400, // Limit each IP to 400 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
} );
app.use( helmet( { crossOriginResourcePolicy: { policy: "cross-origin" } } ) );
app.use( limiter );

//routes
app.get( '*', checkUser );
app.get( '/jwtid', requireAuth, ( req, res ) => {
    res.status( 200 ).json( res.locals.user.id )
} );

app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );
app.use( '/api/auth', userRoutes );
app.use( '/api/posts', postRoutes );


// models links
User.hasMany( Post, {
    foreignKey: 'userId'
} );
Post.belongsTo( User, {
    foreignKey: 'userId'
} );
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
User.belongsToMany( Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
} );
Role.belongsToMany( User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
} );

//post needs to be synced after routes
Post.sync()
    .then( () => {
        console.log( `Database & posts table created!` );
    } );


app.use( errorHandler );

module.exports = app;