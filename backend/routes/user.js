const express = require( 'express' );
const router = express.Router();
const userCtrl = require( '../controllers/user' );
const verifySignUp = require( '../middleware/verifySignup' );

router.post( '/signup', verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted, userCtrl.signup );

router.post( '/login', userCtrl.login );

router.get( '/logout', userCtrl.logout );

router.get( '/users', userCtrl.getAllUsers );

router.get( '/user/:id', userCtrl.getOneUser );

router.put( '/user/:id', userCtrl.updateUser );

router.delete( '/user/:id', userCtrl.deleteUser );

module.exports = router;