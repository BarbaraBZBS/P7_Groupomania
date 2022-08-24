import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'

const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState( true )
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect( () => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch ( err ) {
                console.error( err )
            }
            finally {
                setIsLoading( false )
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading( false )

    }, [ auth, refresh ] )

    useEffect( () => {
        console.log( `isLoading: ${ isLoading }` )
        console.log( `T: ${ JSON.stringify( auth?.token ) }` )
    }, [ isLoading, auth ] )

    return <>
        { isLoading
            ? <p>Loading...</p>
            : <Outlet />
        }
    </>
}

export default PersistLogin