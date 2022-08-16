const express = require( 'express' );
const router = express.Router();
const userCtrl = require( '../controllers/user' );
const verifySignUp = require( '../middleware/verifySignup' );

router.post( '/signup', verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted, userCtrl.signup );

router.post( '/login', userCtrl.login );


module.exports = router;