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

    return <li className='li' onClick={ logout } aria-label='logout icon' role='navigation' tabIndex="0">
        <FontAwesomeIcon icon={ faRightFromBracket } className='icon hover:text-appred' aria-label='logout icon' />
    </li>
}

export default Logout