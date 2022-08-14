const Post = require( '../models/post' );
const fs = require( 'fs' );
const User = require( '../models/user' );

exports.getAllPosts = ( req, res ) => {
    const limit = parseInt( req.query.limit );
    const offset = parseInt( req.query.offset );
    //const fields = req.query.fields;

    Post.findAll( {
        //attributes: (fields !== '*' && fields != null ) ? fields.split(',') : null,
        limit: ( !isNaN( limit ) ) ? limit : 10,
        offset: ( !isNaN( offset ) ) ? offset : 10,
        include: [ {
            model: User,
            attributes: [ 'email' ]
        } ],
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
    Post.findByPk( id )
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
    try {
        const postObject = req.file ? {
            ...JSON.parse( req.body.post ),
            image: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`
        } : { ...req.body };
        // delete postObject.id;
        delete postObject.userId;

        await Post.create( {
            ...postObject,
            userId: req.auth.userId,
        } );
        res.status( 201 ).json( { message: 'post created' } );
        console.log( 'success: post created' );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } )
        console.log( 'error: post not created', res.statusCode );
    }
};

exports.modifyPost = async ( req, res, next ) => {
    try {
        const postObject = req.file ? {
            ...JSON.parse( req.body.post ),
            image: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`
        } : { ...req.body };
        delete postObject.userId;
        await Post.findByPk( req.params.id )
            .then( ( post ) => {
                if ( post.userId != req.auth.userId ) {
                    res.status( 401 ).json( { message: 'Not authorized' } );
                }
                else {
                    post.update( {
                        ...postObject,
                        userId: req.auth.userId,
                        //id: req.params.id
                    } )
                        .then( ( post ) => {
                            if ( post ) {
                                res.status( 201 ).json( post )
                                console.log( 'success: post updated' )
                            } else {
                                res.status( 404 ).json( { message: "Ce post n'existe pas" } )
                            }
                        } )
                        .catch( error => res.status( 401 ).json( { error } ) );
                }
            } );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } );
        console.log( 'error: post not updated', res.statusCode )
    }
};

exports.deletePost = ( req, res ) => {
    Post.findByPk( req.params.id )
        .then( ( post ) => {
            if ( post.userId != req.auth.userId ) {
                res.status( 401 ).json( { message: 'Not authorized' } );
            }
            else {
                const filename = post.image.split( '/images/' )[ 1 ];
                fs.unlink( `images/${ filename }`, () => {
                    post.destroy()
                        .then( () => {
                            res.status( 200 ).json( { message: 'Post supprimé !' } );
                        } )
                        .catch( error => res.status( 401 ).json( { error } ) );
                } );
            }
        } )
        .catch( error => { res.status( 500 ).json( { error } ) } );
};

exports.likeStatusPost = ( req, res, next ) => {
    Post.findByPk( req.params.id )
        .then( post => {
            if ( req.body.like == 1 ) {
                if ( !post.usersLiked.includes( req.body.userId ) ) {
                    post.likes++;
                    post.usersLiked.push( req.body.userId );
                    console.log( 'users liked', sauce.usersLiked );
                    console.log( 'likes', sauce.likes );
                }
            }
            else if ( req.body.like == 0 ) {
                if ( post.usersLiked.includes( req.body.userId ) ) {
                    post.likes--;
                    post.usersLiked.splice( post.usersLiked.indexOf( req.body.userId ) );
                }
                else if ( post.usersDisliked.includes( req.body.userId ) ) {
                    post.dislikes--;
                    post.usersDisliked.splice( post.usersDisliked.indexOf( req.body.userId ) );
                }
                console.log( 'dislikes', sauce.dislikes );
                console.log( 'users disliked', sauce.usersDisliked );
                console.log( 'users liked', sauce.usersLiked );
                console.log( 'likes', sauce.likes );
            }
            else if ( req.body.like == -1 ) {
                if ( !post.usersDisliked.includes( req.body.userId ) ) {
                    post.dislikes++;
                    post.usersDisliked.push( req.body.userId );
                    console.log( 'dislikes', sauce.dislikes );
                    console.log( 'users disliked', sauce.usersDisliked );
                }
            }

            post.set( { likes: req.body.likes, dislikes: req.body.dislikes } )
            post.save()
            //post.update( { likes: req.body.likes, dislikes: req.body.dislikes, usersLiked: [], usersDisliked: [] } )
            res.status( 200 ).json( { message: 'Sauce like status updated !' } )
        } )
        .catch( error => res.status( 400 ).json( { error } ) );
    console.log( 'post id', req.params.id );
};