const express = require( 'express' );
const router = express.Router();
const multer = require( '../middleware/multer-config' );
const postCtrl = require( '../controllers/post' );

router.get( '/', postCtrl.getAllPosts );

router.get( '/:id', postCtrl.getOnePost );

router.post( '/', multer, postCtrl.createPost );

router.put( '/:id', multer, postCtrl.modifyPost );

router.delete( '/:id', postCtrl.deletePost );

router.post( '/:id/like', postCtrl.likeStatusPost );

module.exports = router;