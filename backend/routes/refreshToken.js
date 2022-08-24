const express = require( 'express' );
const router = express.Router();
const refreshTokenCtrl = require( '../controllers/refreshToken' );

router.get( '/', refreshTokenCtrl.handleRefreshToken );

module.exports = router;