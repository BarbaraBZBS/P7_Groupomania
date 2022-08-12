const Post = require( '../models/post' );


exports.getAllPosts = ( req, res ) => {
    Post.findAll()
        .then( ( posts ) => {
            res.json( posts )
        } )
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
        await Post.create( {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            usersLiked: [],
            usersDisliked: []
        } );
        res.status( 201 ).json( { message: 'post created' } );
        console.log( 'success: post created', req.body );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } )
        console.log( 'error: post not created', res.statusCode );
    }
};

exports.modifyPost = async ( req, res ) => {
    try {
        await Post.findByPk( req.params.id ).then( ( post ) => {
            post.update( {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                usersLiked: [],
                usersDisliked: []
            } )
                .then( ( post ) => {
                    if ( post ) {
                        res.status( 201 ).json( post )
                        console.log( 'success: post updated', req.body )
                    } else {
                        res.status( 404 ).json( { message: "Ce post n'existe pas" } )
                    }
                } )
        } );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } );
        console.log( 'error: post not updated', res.statusCode )
    }
};

exports.deletePost = ( req, res ) => {
    Post.findByPk( req.params.id ).then( ( post ) => {
        post.destroy();
    } )
        .then( ( post ) => {
            res.sendStatus( 200 );
        } )
        .catch( error => res.status( 400 ).json( { error } ) )
};