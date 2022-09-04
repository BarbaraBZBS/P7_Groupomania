import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faImage } from '@fortawesome/free-solid-svg-icons'
import { isEmpty, timestampParser } from '../../utils'
import { useDispatch } from 'react-redux'
import { addPost, getPosts } from '../../actions/postActions'


const CreatePostForm = () => {
    const [ isLoading, setIsLoading ] = useState( true )
    const [ title, setTitle ] = useState( '' )
    const [ message, setMessage ] = useState( '' )
    const [ postImg, setPostImg ] = useState( null )
    const [ file, setFile ] = useState()

    const userData = useSelector( ( state ) => state.userReducer )
    const dispatch = useDispatch()

    const handlePicture = ( e ) => {
        setPostImg( URL.createObjectURL( e.target.files[ 0 ] ) )
        console.log( e.target.files[ 0 ] )
        setFile( ( e.target.files[ 0 ] ) )
        console.log( 'file:', file )
    }

    const handlePost = async () => {
        if ( message ) {
            const data = new FormData()

            data.append( 'title', title )
            data.append( 'content', message )
            if ( file ) data.append( 'image', file )
            data.append( 'userId', userData.id )
            console.log( data )

            await dispatch( addPost( data ) )
            dispatch( getPosts() )
            cancelPost()
        } else {
            alert( 'Veuillez entrer un message !' )
        }
    }

    const cancelPost = () => {
        setTitle( '' )
        setMessage( '' )
        setPostImg( '' )
        setFile( '' )
    }

    useEffect( () => {
        if ( !isEmpty( userData ) ) setIsLoading( false )
    }, [ userData ] )

    return <div className='flex flex-col'>
        { isLoading ? (
            <FontAwesomeIcon icon={ faFan } className='animate-spin' />
        ) : (
            <>
                <div className='new-post-card form'>
                    <h1 className='title2'>Ajouter un nouveau message </h1>
                    <input className='input mb-2 shadow-md'
                        type='text'
                        id='title'
                        placeholder='Titre du post... (optionnel)'
                        onChange={ ( e ) => setTitle( e.target.value ) }
                        value={ title }
                    />
                    <textarea className='input mb-2 shadow-md'
                        name='message'
                        id='message'
                        placeholder='Votre post ici...'
                        onChange={ ( e ) => setMessage( e.target.value ) }
                        value={ message }
                    />
                    { title || message || postImg ? (
                        <li className='new-post-overview li form'>
                            <div className='card-header mt-2'>
                                <div className='mx-1 px-1'>
                                    De : { userData.username }
                                </div>
                                <div className='mx-1 px-1'>
                                    { title }
                                </div>
                                <span className='italic mx-1 px-1'>
                                    { timestampParser( Date.now() ) }
                                </span>
                            </div>
                            <div className='mx-3 my-2'>
                                <p className='mb-4'>
                                    { message }
                                </p>
                                <div>
                                    { postImg ? (
                                        <img src={ postImg } alt='' className='card-img' />
                                    ) : null }
                                </div>
                            </div>
                        </li>
                    ) : null }
                    <div className='flex flex-row justify-between'>
                        <div className='relative'>
                            <FontAwesomeIcon icon={ faImage } className='icon mx-1 absolute' />
                            <input className='input absolute w-7 h-6 cursor-pointer text-[0px] opacity-0 indent-[-100px]'
                                type='file'
                                id='img-upload'
                                name='image'
                                accept='.jpeg, .jpg, .png'
                                onChange={ ( e ) => handlePicture( e ) }
                            />
                        </div>
                        <div>
                            { title || message || postImg ? (
                                <button className='btn-delete my-0 mx-2' onClick={ cancelPost }>Annuler</button>
                            ) : null }
                            <button className='btn btn-hover my-0 mx-2' onClick={ handlePost }>Envoyer</button>
                        </div>
                    </div>
                </div>
            </>
        ) }
    </div>
}

export default CreatePostForm