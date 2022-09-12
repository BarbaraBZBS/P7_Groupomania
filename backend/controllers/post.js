const Post = require( '../models/post' );
const fs = require( 'fs' );
const User = require( '../models/user' );
const sequelize = require( '../database/sequelize' );
const Like = require( '../models/like' );

exports.getAllPosts = ( req, res ) => {
    Post.findAll( {
        order: [ [ 'updatedAt', 'DESC' ] ],
        include: {
            model: User,
            attributes: [ 'username', 'email' ]
        }
    } )
        .then( ( posts ) => {
            if ( posts ) {
                res.status( 200 ).json( posts )
            }
            else {
                res.status( 401 ).json( { message: 'No post found' } )
            }
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};

exports.getOnePost = ( req, res ) => {
    let { id } = req.params;
    Post.findByPk( id, {
        include: {
            model: User,
            attributes: [ 'username', 'email' ]
        }
    } )
        .then( ( post ) => {
            if ( post ) {
                res.status( 200 ).json( post )
            } else {
                res.status( 404 ).send();
            }
        } )
        .catch( error => res.status( 404 ).json( { error } ) )
};

exports.createPost = async ( req, res, next ) => {
    console.log( req.body );
    console.log( req.file );
    try {
        let imagePath = '';
        if ( req.file ) {
            if ( req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' ) {
                return res.status( 400 ).json( { message: "Mauvais type d'image !" } )
            }
            else {
                imagePath = `${ req.protocol }://${ req.get( "host" ) }/images/${ req.file.filename }`;
                await Post.create( {
                    title: req.body.title,
                    content: req.body.content,
                    image: imagePath,
                    userId: req.body.userId
                } )
            }
        }
        else {
            await Post.create( {
                title: req.body.title,
                content: req.body.content,
                userId: req.body.userId
            } )
        }
        res.status( 201 ).json( { message: 'post created' } );
        console.log( 'success: post created' );
    }
    catch ( error ) {
        console.log( error )
        res.status( 400 ).json( { error } )
        console.log( 'error: post not created', res.statusCode );
    }
};

exports.modifyPost = async ( req, res, next ) => {
    try {
        let imagePath = '';
        await Post.findByPk( req.params.id )
            .then( ( post ) => {
                if ( req.file ) {
                    if ( req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' ) {
                        return res.status( 400 ).json( { message: "Mauvais type d'image !" } )
                    }
                    else {
                        imagePath = `${ req.protocol }://${ req.get( "host" ) }/images/${ req.file.filename }`;
                        post.update( {
                            title: req.body.title,
                            content: req.body.content,
                            image: imagePath,
                            userId: req.body.userId,
                            postId: req.body.postId
                        } )
                        console.log( 'success, updated :', post )
                        res.status( 200 ).json( { message: 'post updated !' } )
                    }
                }
                else {
                    post.update( {
                        title: req.body.title,
                        content: req.body.content,
                    } )
                    console.log( 'success, updated :', post )
                    res.status( 200 ).json( { message: 'post updated' } )
                }
            } )
    }
    catch ( error ) {
        console.log( error )
        res.status( 400 ).json( { error } );
        console.log( 'error: post not updated', res.statusCode )
    }
}

exports.deletePost = ( req, res ) => {
    Post.findByPk( req.params.id )
        .then( ( post ) => {
            if ( post.image ) {
                const filename = post.image.split( '/images/' )[ 1 ];
                fs.unlink( `images/${ filename }`, () => {
                    post.destroy()
                        .then( () => {
                            res.status( 200 ).json( { message: 'Post deleted !' } );
                        } )
                        .catch( error => res.status( 400 ).json( { error } ) );
                } );
            }
            else {
                post.destroy()
                    .then( () => {
                        res.status( 200 ).json( { message: 'Post deleted !' } );
                    } )
                    .catch( error => res.status( 400 ).json( { error } ) );
            }
        } )
        .catch( error => { res.status( 500 ).json( { error } ) } );
}

exports.likeStatusPost = async ( req, res ) => {
    const userId = req.body.userId;
    const postId = parseInt( req.params.id );

    if ( postId <= 0 ) {
        return res.status( 400 ).json( { message: 'invalid parameters' } )
    }
    Post.findOne( { where: { id: postId } } )
    User.findOne( { where: { id: userId } } )
    Like.findOne( { where: { postId: postId, userId: userId } } )
        .then( async like => {
            if ( like ) {
                await Like.destroy( { where: { postId: postId, userId: userId } } )
                    .then( () => {
                        Post.findOne( { where: { id: postId } } )
                            .then( ( post ) => {
                                post.update( { likes: sequelize.literal( 'likes - 1' ) } )
                                res.status( 200 ).json( { message: 'post unliked !' } )
                            } )
                            .catch( error => res.status( 400 ).json( error ) )
                    } )
                    .catch( error => {
                        console.log( 'error : ', error )
                        res.status( 404 ).json( { error } )
                    } )
            }
            else {
                await Like.create( {
                    postId: postId,
                    userId: userId
                } )
                    .then( () => {
                        Post.findOne( { where: { id: postId } } )
                            .then( ( post ) => {
                                post.update( { likes: sequelize.literal( 'likes + 1' ) } )
                                res.status( 201 ).json( { message: 'post liked !' } )
                            } )
                            .catch( error => res.status( 400 ).json( { error } ) )
                    } )
                    .catch( error => {
                        res.status( 404 ).json( { error } )
                    } )
            }
        } )
    // console.log( postId )
    // console.log( userId )
}

exports.postLiked = ( req, res ) => {
    const { userId, postId } = req.body
    Like.findOne( { where: { postId: postId, userId: userId } } )
        .then( ( liked ) => {
            res.status( 200 ).json( liked )
        } )
}