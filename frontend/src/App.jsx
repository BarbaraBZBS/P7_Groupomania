import { useState, useEffect } from 'react'
import axios from './api/axios'
import { UidContext } from './context/AppContext'
import Router from './components/Routes'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/userActions'
import { BallTriangle } from 'react-loader-spinner'


function App() {
    const [ loading, setLoading ] = useState( true )
    const [ uid, setUid ] = useState( null )
    const dispatch = useDispatch()

    useEffect( () => {
        //setLoading( true )
        setTimeout( () => {
            setLoading( false )
        }, 5000 )
    }, [] )

    useEffect( () => {
        const fetchTokenId = async () => {
            try {
                await axios.get( '/jwtid',
                    { withCredentials: true }
                )
                    .then( ( res ) => {
                        setUid( res.data )
                        console.log( res )
                        console.log( 'uid? : ', uid )
                    } )
            } catch ( err ) {
                console.log( 'No token' )
            }
        }
        fetchTokenId()
        if ( uid ) dispatch( getUser( uid ) )
    }, [ uid, dispatch ] )

    return <>
        { loading ?
            <div className='loader-spinner'>
                <BallTriangle
                    height={ 200 }
                    width={ 200 }
                    radius={ 5 }
                    color="#4E5166"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={ {} }
                    wrapperStyle=""
                    visible={ true }
                />
            </div>
            :
            <UidContext.Provider value={ uid }>
                <Router />
            </UidContext.Provider>
        }
    </>
}

export default App