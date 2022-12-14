import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import { isEmpty } from '../../utils'
import Card from '../Post'
import CardAdmin from '../Post/CardAdmin'

const Thread = () => {
    const [ loadPost, setLoadPost ] = useState( true )
    const [ count, setCount ] = useState( 5 )
    const dispatch = useDispatch()
    const posts = useSelector( ( state ) => state.postReducer )
    const userData = useSelector( ( state ) => state.userReducer )

    const loadMore = () => {
        if ( window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight ) {
            setLoadPost( true )
        }
    }

    useEffect( () => {
        if ( loadPost ) {
            dispatch( getPosts( count ) )
            setLoadPost( false )
            setCount( count + 5 )
        }

        window.addEventListener( 'scroll', loadMore )
        return () => window.removeEventListener( 'scroll', loadMore )
    }, [ loadPost, dispatch, count ] )

    return <section aria-label='thread section' className='thread-container'>
        { userData.role === 'admin' ? (
            <div>
                { !isEmpty( posts[ 0 ] ) &&
                    posts.map( ( post ) => {
                        return <CardAdmin post={ post } key={ post.id } />
                    } ) }
            </div>
        ) : (
            <div>
                { !isEmpty( posts[ 0 ] ) &&
                    posts.map( ( post ) => {
                        return <Card post={ post } key={ post.id } />
                    } ) }
            </div>
        ) }
    </section >
}

export default Thread