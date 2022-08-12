module.exports = app => {
    const user = require( '../controllers/user.controller' );
    const router = require( 'express' ).Router();
    router.post( "/", user.create );

    app.use( '/api/users', router )
}