import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare, faFileImage } from '@fortawesome/free-regular-svg-icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../utils'
import { dateParser } from '../../utils'
import { useDispatch } from 'react-redux'
import { updatePostTitle, updatePostContent, updatePostImage, getPosts } from '../../actions/postActions'
import DeletePost from './DeletePost'
import LikeButton from './LikeButton'

const Card = ( { post } ) => {
    const [ isLoading, setIsLoading ] = useState( true )
    const [ isTitleEditable, setIsTitleEditable ] = useState( false )
    const [ isContentEditable, setIsContentEditable ] = useState( false )
    const [ isImageEditable, setIsImageEditable ] = useState( false )
    const [ textTitleUpdate, setTextTitleUpdate ] = useState( null )
    const [ textContentUpdate, setTextContentUpdate ] = useState( null )
    const [ imgUpdate, setImgUpdate ] = useState( null )

    const usersData = useSelector( ( state ) => state.usersReducer )
    const userData = useSelector( ( state ) => state.userReducer )
    const error = useSelector( ( state ) => state.errorReducer.imageUpdError )
    const dispatch = useDispatch()

    const updateTitle = () => {
        if ( textTitleUpdate ) {
            dispatch( updatePostTitle( post.id, textTitleUpdate ) )
        }
        setIsTitleEditable( false )
    }

    const updateContent = () => {
        if ( textContentUpdate ) {
            dispatch( updatePostContent( post.id, textContentUpdate ) )
        }
        setIsContentEditable( false )
    }

    const updateImage = async () => {
        try {
            const data = new FormData()
            data.append( 'title', post.title )
            data.append( 'content', post.content )
            data.append( 'image', imgUpdate )
            data.append( 'userId', userData.id )
            data.append( 'postId', post.id )
            console.log( data, post.id )
            await dispatch( updatePostImage( data, post.id ) )
            dispatch( getPosts() )
            setIsImageEditable( false )
        }
        catch ( error ) {
            console.log( error )
        }
    }

    useEffect( () => {
        !isEmpty( usersData[ 0 ] ) && setIsLoading( false )
    }, [ usersData ] )

    return <div aria-label='post card' role='region' tabIndex="0" className='post-card'>
        <div key={ post.id }>
            { isLoading ? (
                <FontAwesomeIcon icon={ faFan } className='bg-transparent text-appstone animate-spin' />
            ) : (
                <>
                    <div className='card-header mt-3 mb-4'>
                        <div className='mx-1 px-1'>
                            { !isEmpty( usersData[ 0 ] ) &&
                                usersData.map( ( user ) => {
                                    if ( user.id === post.userId ) return <span><span className='italic'>{ 'De : ' }</span> <strong>{ user.username }</strong></span>
                                    else return null
                                } ) }
                        </div>
                        { ( userData.id === post.userId || isTitleEditable === false ) && (
                            <>
                                <div className='mx-1 px-1' onClick={ () => ( userData.id === post.userId &&
                                    ( setIsTitleEditable( !isTitleEditable ) ) ) }>
                                    <strong>{ post.title }</strong>
                                </div>
                            </>
                        ) }
                        { ( userData.id === post.userId ) && (
                            <button onClick={ () => setIsTitleEditable( !isTitleEditable ) }>
                                <span className="sr-only">Edit title icon</span>
                                <FontAwesomeIcon icon={ faPenToSquare } className='text-violet-900 hover:text-green-600 cursor-pointer' />
                            </button>
                        ) }
                        { isTitleEditable && (
                            <div className='ml-2'>
                                <input className='input m-0 p-0 shadow-md w-28 sm:w-auto'
                                    type='text'
                                    defaultValue={ post.title }
                                    onChange={ ( e ) => setTextTitleUpdate(
                                        e.target.value ) } />
                                <div>
                                    <button className='btn btn-hover mt-4 sm:mb-0' onClick={ updateTitle }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <span className='italic mx-1 px-1'>{ dateParser( post.createdAt ) }</span>
                    </div>
                    <div className='mx-7 my-2'>
                        { ( userData.id === post.userId || isContentEditable === false ) && (
                            <>
                                <p className='mb-6' onClick={ () => ( userData.id === post.userId &&
                                    ( setIsContentEditable( !isContentEditable ) ) ) }>
                                    { post.content }
                                </p>
                            </>
                        ) }
                        { isContentEditable && (
                            <div>
                                <textarea className='input w-40 sm:w-96 shadow-md'
                                    defaultValue={ post.content }
                                    onChange={ ( e ) => setTextContentUpdate(
                                        e.target.value ) }
                                />
                                <div>
                                    <button className='btn btn-hover mb-3' onClick={ updateContent }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <div>
                            { post.image && <img src={ post.image } alt='Posted file' className='card-img' /> }
                        </div>
                        { !isEmpty( error ) && imgUpdate && post.id && <p className='text-xl font-semibold text-appred mt-2'
                            aria-live='assertive'>{ error }</p> }
                    </div>
                    { isImageEditable && (
                        <div>
                            <input className='input my-2 w-[200px] sm:w-[427px]'
                                type='file'
                                id='img-upload'
                                name='image'
                                accept='.jpeg, .jpg, .png'
                                onChange={ ( e ) => setImgUpdate(
                                    ( e.target.files[ 0 ] ) ) }
                            />
                            <div>
                                <button className='btn btn-hover mb-3' onClick={ updateImage }>
                                    Valider
                                </button>
                            </div>
                        </div>
                    ) }
                    { userData.id === post.userId && (
                        <div className='flex flex-row justify-end'>
                            <button className='m-1 pr-1' onClick={ () =>
                                setIsImageEditable( !isImageEditable ) }>
                                <span className="sr-only">Edit image file icon</span>
                                <FontAwesomeIcon icon={ faFileImage } className='text-violet-900 hover:text-green-600 cursor-pointer' />
                            </button>
                            <button className='m-1' onClick={ () =>
                                setIsContentEditable( !isContentEditable ) }>
                                <span className="sr-only">Edit message icon</span>
                                <FontAwesomeIcon icon={ faFilePen } className='text-violet-900 hover:text-green-600 cursor-pointer' />
                            </button>
                            <DeletePost id={ post.id } />
                        </div>
                    ) }
                    <LikeButton post={ post } />
                </>
            ) }
        </div>
    </div >
}

export default Card