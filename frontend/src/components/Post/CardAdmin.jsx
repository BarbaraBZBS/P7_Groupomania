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

const CardAdmin = ( { post } ) => {
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

    return <div className='post-card'>
        <li className='li' key={ post.id }>
            { isLoading ? (
                <FontAwesomeIcon icon={ faFan } className='bg-transparent text-appstone animate-spin' />
            ) : (
                <>
                    <div className='card-header mt-3 mb-4'>
                        <div className='font-semibold mx-1 px-1'>
                            { !isEmpty( usersData[ 0 ] ) &&
                                usersData.map( ( user ) => {
                                    if ( user.id === post.userId ) return 'De : ' + user.username
                                    else return null
                                } ) }
                        </div>
                        { isTitleEditable === false && (
                            <>
                                <div className='mx-1 px-1' onClick={ () => ( userData.id === post.userId &&
                                    ( setIsTitleEditable( !isTitleEditable ) ) ) }>
                                    { post.title }
                                </div>
                            </>
                        ) }
                        <div onClick={ () => setIsTitleEditable( !isTitleEditable ) }>
                            <FontAwesomeIcon icon={ faPenToSquare } className='text-violet-900 cursor-pointer' />
                        </div>
                        { isTitleEditable && (
                            <div className='ml-2'>
                                <input className='input m-0 p-0 shadow-md'
                                    type='text'
                                    defaultValue={ post.title }
                                    onChange={ ( e ) => setTextUpdate( e.target.value ) } />
                                <div>
                                    <button className='btn btn-hover' onClick={ updateTitle }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <span className='italic mx-1 px-1'>{ dateParser( post.createdAt ) }</span>
                    </div>
                    <div className='mx-7 my-2'>
                        { isContentEditable === false && (
                            <>
                                <p className='mb-6' onClick={ () =>
                                    setIsContentEditable( !isContentEditable ) }>
                                    { post.content }
                                </p>
                            </>
                        ) }
                        { isContentEditable && (
                            <div>
                                <textarea className='input w-96 shadow-md'
                                    defaultValue={ post.content }
                                    onChange={ ( e ) => setTextUpdate( e.target.value ) }
                                />
                                <div>
                                    <button className='btn btn-hover mb-3' onClick={ updateContent }>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        ) }
                        <div>
                            { post.image && <img src={ post.image } alt='Post' className='card-img' /> }
                        </div>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <div className='m-1' onClick={ () => setIsContentEditable( !isContentEditable ) }>
                            <FontAwesomeIcon icon={ faFilePen } className='text-violet-900 cursor-pointer' />
                        </div>
                        <DeletePost id={ post.id } />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={ faHeart } className='icon mb-2' />
                    </div>
                </>
            ) }
        </li>
    </div >
}

export default CardAdmin