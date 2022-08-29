import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils'

const Card = ( { post } ) => {
    const [ isLoading, setIsLoading ] = useState( true )
    const usersData = useSelector( ( state ) => state.usersReducer )
    const userData = useSelector( ( state ) => state.userReducer )

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
                                } ) }
                        </div>
                        <div className='post-title'>
                            { post.title }
                        </div>
                        {/* <span className='card-time'>{dateParser(post.createdAt)}</div> */ }
                    </div>
                    <br />
                    <p className='card-content'>
                        { post.content }
                        { post.image && <img src={ post.image } alt='post' className='card-img' /> }
                    </p>
                    <div className='card-footer'>
                        <h4>like button</h4>
                    </div>
                </>
            ) }
        </li>
    </div>
}

export default Card