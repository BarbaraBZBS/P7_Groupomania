const express = require( 'express' );
const router = express.Router();
const auth = require( '../middleware/auth' );
const isAdmin = require( '../middleware/ad' );
const multer = require( '../middleware/multer-config' );
const adCtrl = require( '../controllers/ad' );

router.get( '/', auth, adCtrl.getAllPostsA );

router.get( '/:id', auth, adCtrl.getOnePostA );

router.post( '/', auth, isAdmin, multer, adCtrl.createPostA );

router.put( '/:id', auth, isAdmin, multer, adCtrl.modifyPostA );

router.delete( '/:id', auth, isAdmin, adCtrl.deletePostA );


module.exports = router;