import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../utils'
import { dateParser } from '../../utils'
import { useDispatch } from 'react-redux'
import { updatePostTitle } from '../../actions/postActions'
import { updatePostContent } from '../../actions/postActions'
import DeletePost from './DeletePost'

const Card = ( { post } ) => {
    const [ isLoading, setIsLoading ] = useState( true )
    const [ isTitleEditable, setIsTitleEditable ] = useState( false )
    const [ isContentEditable, setIsContentEditable ] = useState( false )
    const [ textUpdate, setTextUpdate ] = useState( null )
    const usersData = useSelector( ( state ) => state.usersReducer )
    const userData = useSelector( ( state ) => state.userReducer )
    const dispatch = useDispatch()

    const updateTitle = () => {
        if ( textUpdate ) {
            dispatch( updatePostTitle( post.id, textUpdate ) )
        }
        setIsTitleEditable( false )
    }

    const updateContent = () => {
        if ( textUpdate ) {
            dispatch( updatePostContent( post.id, textUpdate ) )
        }
        setIsContentEditable( false )
    }

    useEffect( () => {
        !isEmpty( usersData[ 0 ] ) && setIsLoading( false )
    }, [ usersData ] )

    return <div className='card'>
        <li className='card-container' key={ post.id }>
            { isLoading ? (
                <FontAwesomeIcon icon={ faFan } className='spinner' />
            ) : (
                <>
                    <div className='card-header'>
                        <div className='user-name'>
                            { !isEmpty( usersData[ 0 ] ) &&
                                usersData.map( ( user ) => {
                                    if ( user.id === post.userId ) return 'De : ' + user.username
                                    else return null
                                } ) }
                        </div>
                        { ( userData.id === post.userId || isTitleEditable === false ) && (
                            <>
                                <div className='post-title' onClick={ () => ( userData.id === post.userId &&
                                    ( setIsTitleEditable( !isTitleEditable ) ) ) }>
                                    { post.title }
                                </div>
                            </>
                        ) }
                        { ( userData.id === post.userId ) && (
                            <div onClick={ () => setIsTitleEditable( !isTitleEditable ) }>
                                <FontAwesomeIcon icon={ faPenToSquare } className='title-icon' />
                            </div>
                        ) }

                        { isTitleEditable && (
                            <div className='update-title'>
                                <input
                                    type='text'
                                    defaultValue={ post.title }
                                    onChange={ ( e ) => setTextUpdate( e.target.value ) } />
                                <div className='btn-container'>
                                    <button className='btn' onClick={ updateTitle }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <span className='card-time'>{ dateParser( post.createdAt ) }</span>
                    </div>
                    <div className='card-content'>
                        { ( userData.id === post.userId || isContentEditable === false ) && (
                            <>
                                <p className='post-content' onClick={ () => ( userData.id === post.userId &&
                                    ( setIsContentEditable( !isContentEditable ) ) ) }>
                                    { post.content }
                                </p>
                            </>
                        ) }
                        { isContentEditable && (
                            <div className='update-content'>
                                <textarea
                                    defaultValue={ post.content }
                                    onChange={ ( e ) => setTextUpdate( e.target.value ) }
                                />
                                <div className='btn-container'>
                                    <button className='btn' onClick={ updateContent }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <div className='post-img'>
                            { post.image && <img src={ post.image } alt='post' className='card-img' /> }
                        </div>
                    </div>
                    { userData.id === post.userId && (
                        <div className='btn-container'>
                            <div onClick={ () => setIsContentEditable( !isContentEditable ) }>
                                <FontAwesomeIcon icon={ faFilePen } className='edit-icon' />
                            </div>
                            <DeletePost className='delete-post' id={ post.id } />
                        </div>
                    ) }
                    <div className='card-footer'>
                        <FontAwesomeIcon icon={ faHeart } className='like-icon' />
                        <h4>like button</h4>
                    </div>
                </>
            ) }
        </li>
    </div >
}

export default Card