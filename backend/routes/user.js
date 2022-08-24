const express = require( 'express' );
const router = express.Router();
const userCtrl = require( '../controllers/user' );
const verifySignUp = require( '../middleware/verifySignup' );
const auth = require( '../middleware/auth' );
const ROLES_LIST = require( '../config/roles_list' );
const verifyRoles = require( '../middleware/verifyRoles' );

router.post( '/signup', verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted, userCtrl.signup );

router.post( '/login', userCtrl.login );

router.get( '/logout', userCtrl.logout );

router.get( '/users', verifyRoles( ROLES_LIST.Admin ), userCtrl.getAllUsers );

module.exports = router;