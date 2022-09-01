import axios from '../../api/axios'
import cookie from 'js-cookie'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Logout() {

    const removeCookie = ( key ) => {
        if ( typeof window !== 'undefined' ) {
            cookie.remove( key ) //{ expires: 1 }
        }
    }

    const logout = async () => {
        try {
            await axios.get( '/api/auth/logout',
                { withCredentials: true }
            )
                .then( ( response ) => {
                    removeCookie( 'jwt' )
                    console.log( response )

                    window.location = '/'
                } )
                .catch( error => console.log( error ) )
        } catch ( err ) {
            console.error( err )
        }
    }

    return <li className='li' onClick={ logout }>
        <FontAwesomeIcon icon={ faRightFromBracket } className='log-icon' />
    </li>
}

export default Logout