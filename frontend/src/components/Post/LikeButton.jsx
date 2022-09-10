import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { UidContext } from '../../context/AppContext'
import { useDispatch } from 'react-redux'
import { getPosts, likePost } from '../../actions/postActions'
import axios from '../../api/axios'
library.add( fasHeart )
library.add( farHeart )

const LikeButton = ( { post } ) => {
    const [ liked, setLiked ] = useState( false )
    const uid = useContext( UidContext )
    const dispatch = useDispatch()

    const handleLike = async () => {
        if ( liked ) {
            await dispatch( likePost( post.id, uid ) )
            setLiked( false )

        }
        else {
            await dispatch( likePost( post.id, uid ) )
            setLiked( true )
        }
        await dispatch( getPosts( post.likes ) )
    }


    useEffect( () => {
        const isLiked = async () => {
            const postId = post.id
            const userId = uid
            const postLikes = post.likes
            const response = await axios.post( '/api/posts/liked',
                JSON.stringify( { postId, userId } ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            // console.log( JSON.stringify( response.data ) )
            if ( response.data ) {
                console.log( JSON.stringify( response?.data ) )
                setLiked( true )
                console.log( postLikes )
            }
            else {
                console.log( JSON.stringify( response?.data ) )
                setLiked( false )
                console.log( postLikes )
            }
        }
        isLiked()
    }, [ post, uid ] )


    return <>
        <button onClick={ handleLike }>
            { liked === false && (
                <div>
                    <FontAwesomeIcon icon={ farHeart }
                        className='icon mb-2 text-appstone hover:text-appopred text-lg sm:text-2xl' />
                    <span className="sr-only">Like icon</span>
                </div>
            ) }
            { liked && (
                <div>
                    <span className="sr-only">Liked icon</span>
                    <FontAwesomeIcon icon={ fasHeart }
                        className='icon mb-2 animate-fill text-appred hover:text-red-400 text-lg sm:text-2xl' />
                </div>
            ) }
        </button>
        <span>{ post.likes }</span>
    </>
}

export default LikeButton