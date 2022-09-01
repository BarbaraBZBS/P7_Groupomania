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
    //const [ post, setPost ] = useState()
    const [ post, setPost ] = useState( { title: '', content: '', image: '' } )//

    const userData = useSelector( ( state ) => state.userReducer )
    const dispatch = useDispatch()

    const handlePicture = ( e ) => {
        setPostImg( URL.createObjectURL( e.target.files[ 0 ] ) )
        console.log( e.target.files )
        console.log( e.target.files[ 0 ] )
        console.log( e.target.files[ 0 ].File )
        setFile( ( e.target.files[ 0 ].name ) )
        setPost( {
            // ...post,
            title: title,
            content: message,
            // userId: userData.id,
            image: file
        } )
        console.log( 'file:', file )
        console.log( 'content(message):', message )
        console.log( 'title:', title )
    }

    const handlePost = async () => {
        if ( message ) {
            const data = new FormData()
            if ( file ) {

                data.append( 'title', post.title )
                data.append( 'content', post.content )
                data.append( 'image', post.file )
                //data.append( 'image', file )
                data.append( 'userId', userData.id )
            }
            else {
                data.append( 'title', title )
                data.append( 'content', message )
                data.append( 'userId', userData.id )
            }

            // const post = new FormData()
            // if ( !file ) {
            // data.append( 'userId', userData.id )
            // data.append( 'title', title )
            // post.append( 'content', message )
            //let image
            //let userId
            // const image = file
            // const userId = userData.id
            // if ( file ) data.append( 'image', file )
            // }
            // else {
            //setPost( { 'title': title, 'content': message } )

            // data.append( post, { 'title': title, 'content': message } )//, post
            // data.append( userId, userData.id )//, userId
            // data.append( 'image', file )//, image

            //     // post.append( 'title', title )
            //     // post.append( 'content', message )

            //     data.append( 'post', post )
            //     data.append( 'userId', userData.id )
            //     data.append( 'image', file )
            // }

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
        setPost( { title: '', content: '' } )
    }


    useEffect( () => {
        if ( !isEmpty( userData ) ) setIsLoading( false )
    }, [ userData ] )

    return <div className='post-container'>
        { isLoading ? (
            <FontAwesomeIcon icon={ faFan } className='spinner' />
        ) : (
            <>
                <h3>Ajouter un nouveau message </h3>
                <div className='post-form'>
                    <input
                        type='text'
                        id='title'
                        placeholder='Titre du post... (optionnel)'
                        onChange={ ( e ) => setTitle( e.target.value ) }
                        value={ title }
                    />
                    <textarea
                        name='message'
                        id='message'
                        placeholder='Votre post ici...'
                        onChange={ ( e ) => setMessage( e.target.value ) }
                        value={ message }
                    />
                    { title || message || postImg ? (
                        <li className="list-none">
                            <div className="card-header">
                                <div className="user-name">
                                    De : { userData.username }
                                </div>
                                <div className="post-title">
                                    { title }
                                </div>
                                <span className="card-time">
                                    { timestampParser( Date.now() ) }
                                </span>
                            </div>
                            <div className="card-content">
                                <p className="post-content">
                                    { message }
                                </p>
                                <div className="post-img">
                                    <img src={ postImg } alt='' />
                                </div>
                            </div>
                        </li>
                    ) : null }
                    <div className='footer-form'>
                        <div className='post-icon'>
                            <FontAwesomeIcon icon={ faImage } className='file-icon' />
                            <input
                                type='file'
                                id='img-upload'
                                name='file'
                                accept='.jpeg, .jpg, .png'
                                onChange={ ( e ) => handlePicture( e ) }
                            />
                        </div>
                        <div className='send-btn'>
                            { title || message || postImg ? (
                                <button className='bg-indigo-900 active:bg-appstone hover: bg-blue-900' onClick={ cancelPost }>Annuler</button>
                            ) : null }
                            <button className='bg-indigo-900 active:bg-appstone hover: bg-blue-900' onClick={ handlePost }>Envoyer</button>
                        </div>
                    </div>
                </div>
            </>
        ) }
    </div>
}

export default CreatePostForm