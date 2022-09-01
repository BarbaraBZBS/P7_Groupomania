import Logo from '../../assets/icon-left-font.svg'
import { NavLink } from 'react-router-dom'
import { UidContext } from '../../context/AppContext'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logout from '../Logout'

function Header() {
    const uid = useContext( UidContext )
    const userData = useSelector( ( state ) => state.userReducer )

    return <header className='bg-white p-3 w-full'>
        <nav className='flex justify-between'>
            <div>
                <div className='logo'>
                    <NavLink to='/'>
                        <img src={ Logo } alt='Logo Groupomania' className='flex h-32 object-cover w-64' />
                    </NavLink>
                </div>
            </div>
            { uid ? (
                <ul className='li flex items-center m-7'>
                    <li></li>
                    <li >
                        <NavLink to='/profil'>
                            <h5>Bienvenue { userData.username }</h5>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
            ) : (
                <ul className='li flex items-center m-7'>
                    <li></li>
                    <li>
                        <NavLink to='/profil'>
                            <FontAwesomeIcon icon={ faRightToBracket } className='log-icon' />
                        </NavLink>
                    </li>
                </ul>
            ) }
        </nav>
    </header>
}

export default Header