const Post = require( '../models/post' );
const fs = require( 'fs' );

exports.getAllPosts = ( req, res ) => {
    Post.findAll(
        { limit: 10 }
    )
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
        console.log( 'success: post created', req.body );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } )
        console.log( 'error: post not created', res.statusCode );
    }
};

/////// createPost before multer ////////////
// exports.createPost = async ( req, res, next ) => {
//     try {
//         await Post.create( {
//             userId: req.body.userId,
//             from: req.body.from,
//             title: req.body.title,
//             content: req.body.content,
//             image: req.body.image,
//             likes: req.body.likes,
//             dislikes: req.body.dislikes,
//             usersLiked: [],
//             usersDisliked: []
//         } );
//         res.status( 201 ).json( { message: 'post created' } );
//         console.log( 'success: post created', req.body );
//     }
//     catch ( error ) {
//         res.status( 400 ).json( { error } )
//         console.log( 'error: post not created', res.statusCode );
//     }
// };

exports.modifyPost = async ( req, res ) => {
    // try {
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
                    //userId: req.auth.userId,
                    //id: req.params.id
                } )
                    .then( ( post ) => {
                        // if ( post ) {
                        res.status( 201 ).json( post )
                        console.log( 'success: post updated', req.body )
                        // } else {
                        //     res.status( 404 ).json( { message: "Ce post n'existe pas" } )
                        // }
                    } )
                    .catch( error => res.status( 401 ).json( { error } ) );
            }
        } );
    // }
    // catch ( error ) {
    //     res.status( 400 ).json( { error } );
    //     console.log( 'error: post not updated', res.statusCode )
    // }
};

////////////// modifyPost before multer ///////////////
// exports.modifyPost = async ( req, res ) => {
//     try {
//         await Post.findByPk( req.params.id ).then( ( post ) => {
//             post.update( {
//                 userId: req.auth.userId,
//                 from: req.body.from,
//                 title: req.body.title,
//                 content: req.body.content,
//                 image: req.body.image,
//                 likes: req.body.likes,
//                 dislikes: req.body.dislikes,
//                 usersLiked: [],
//                 usersDisliked: []
//             } )
//                 .then( ( post ) => {
//                     if ( post ) {
//                         res.status( 201 ).json( post )
//                         console.log( 'success: post updated', req.body )
//                     } else {
//                         res.status( 404 ).json( { message: "Ce post n'existe pas" } )
//                     }
//                 } )
//         } );
//     }
//     catch ( error ) {
//         res.status( 400 ).json( { error } );
//         console.log( 'error: post not updated', res.statusCode )
//     }
// };


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


///////// deletePost before multer ////////
// exports.deletePost = ( req, res ) => {
//     Post.findByPk( req.params.id ).then( ( post ) => {
//         post.destroy();
//     } )
//         .then( ( post ) => {
//             res.sendStatus( 200 );
//         } )
//         .catch( error => res.status( 400 ).json( { error } ) )
// };

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
            // post.save()
            post.update( { likes: req.body.likes, dislikes: req.body.dislikes, usersLiked: [], usersDisliked: [] } )
            //post.set( { likes: req.body.likes, dislikes: req.body.dislikes } )
            res.status( 200 ).json( { message: 'Sauce like status updated !' } )
        } )
        .catch( error => res.status( 400 ).json( { error } ) );
    console.log( 'post id', req.params.id );
};