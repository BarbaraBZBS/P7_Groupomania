import axios from '../api/axios'
import useAuth from './useAuth'

const useLogout = () => {
    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth( {} )
        try {
            const response = await axios( '/api/auth/logout', {
                withCredentials: true
            } )
            console.log( response )
        } catch ( err ) {
            console.error( err )
        }
    }
    return logout
}

export default useLogout