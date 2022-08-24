import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
// import useRefreshToken from '../../hooks/useRefreshToken'
import { useNavigate, useLocation } from 'react-router-dom'
// import axios from '../../api/axios'

function Users() {
    const [ users, setUsers ] = useState()
    // const refresh = useRefreshToken()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect( () => {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get( '/api/auth/users', {
                    signal: controller.signal
                } )
                console.log( response.data )
                isMounted && setUsers( response.data )
            } catch ( err ) {
                console.error( err )
                navigate( '/login', { state: { from: location }, replace: true } )
            }
        }
        getUsers()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [ axiosPrivate, navigate, location ] )

    return <article>
        <h2>Liste des utilisateurs</h2>
        { users?.length
            ? (
                <ul>
                    { users.map( ( user, i ) => <li key={ i }>{ user?.username }</li> ) }
                </ul>
            ) : <p>Pas d'utilisateur à afficher</p>
        }
        {/* <button onClick={ () => refresh() }>Refresh</button>
        <br /> */}
    </article>
}

export default Users