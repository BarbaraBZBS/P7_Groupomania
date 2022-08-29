import { useState, useEffect } from 'react'
import axios from './api/axios'
import { UidContext } from './context/AppContext'
import Router from './components/Routes'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/userActions'
//const ROLES = `${ process.env.ROLES }`


function App() {
    const [ uid, setUid ] = useState( null )
    const dispatch = useDispatch()

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

    return <UidContext.Provider value={ uid }>
        <Router />
    </UidContext.Provider>
}

export default App