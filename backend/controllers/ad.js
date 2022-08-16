const Post = require( '../models/post' );
const fs = require( 'fs' );
const User = require( '../models/user' );

exports.getAllPostsA = ( req, res ) => {
    const limit = parseInt( req.query.limit );
    const offset = parseInt( req.query.offset );
    //const fields = req.query.fields;

    Post.findAll( {
        //attributes: (fields !== '*' && fields != null ) ? fields.split(',') : null,
        limit: ( !isNaN( limit ) ) ? limit : 10,
        offset: ( !isNaN( offset ) ) ? offset : 10,
        include: [ {
            model: User,
            attributes: [ 'username' ]
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

exports.getOnePostA = ( req, res ) => {
    let { id } = req.params;
    Post.findByPk( {
        id,
        include: [ {
            model: User,
            attributes: [ 'username' ]
        } ]
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

exports.createPostA = async ( req, res, next ) => {
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

exports.modifyPostA = async ( req, res, next ) => {
    try {
        const postObject = req.file ? {
            ...JSON.parse( req.body.post ),
            image: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`
        } : { ...req.body };
        delete postObject.userId;
        await Post.findByPk( req.params.id )
            .then( ( post ) => {
                post.update( {
                    ...postObject,
                    userId: postObject.userId,
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
            } );
    }
    catch ( error ) {
        res.status( 400 ).json( { error } );
        console.log( 'error: post not updated', res.statusCode )
    }
};

exports.deletePostA = ( req, res ) => {
    Post.findByPk( req.params.id )
        .then( ( post ) => {
            const filename = post.image.split( '/images/' )[ 1 ];
            fs.unlink( `images/${ filename }`, () => {
                post.destroy()
                    .then( () => {
                        res.status( 200 ).json( { message: 'Post supprimé !' } );
                    } )
                    .catch( error => res.status( 401 ).json( { error } ) );
            } );
        } )
        .catch( error => { res.status( 500 ).json( { error } ) } );
};
