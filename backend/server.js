const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require( './routes/user' );
const postRoutes = require( './routes/post' );
const adminRoutes = require( './routes/admin' );
const User = require( './models/user' );
const Post = require( './models/post' );
const Role = require( './models/role' );
const User_Roles = require( './models/user_roles' );
const Like = require( './models/like' );
const path = require( 'path' );

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
app.use( '/api/admin/posts', adminRoutes );

User.hasMany( Post, {
    foreignKey: 'userId',
    //otherKey: 'username',
    //as: 'username',
    //as: 'user'
} );

Post.belongsTo( User, {
    foreignKey: 'userId',
    //otherKey: 'username',
    //as: 'username',
    //as: 'user'
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
        console.log( `Database & roles table created!` );
        //initial();
    } );

User_Roles.sync()
    .then( () => {
        console.log( `Database & user_roles table created!` );
    } );

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
Like.sync()
    .then( () => {
        console.log( `Database & likes table created!` );
    } );

app.listen( PORT, () => console.log( `Server listening on port ${ PORT }!` ) );
