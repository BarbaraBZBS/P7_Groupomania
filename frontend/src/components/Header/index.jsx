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

    return <header className='bg-white p-0 sm:p-3 w-full'>
        <nav className='flex flex-col items-center sm:flex-row sm:justify-between'>
            <div>
                <div>
                    <NavLink to='/'>
                        <img src={ Logo } alt='Logo Groupomania' className='flex h-32 mr-2 pr-2 object-cover w-64' />
                    </NavLink>
                </div>
            </div>
            { uid ? (
                <ul className='li flex items-center m-2 sm:m-7' aria-label='navigation links'>
                    <li>
                        <NavLink to='/profil'>
                            <h5 className='text-lg mr-3 mb-2 sm:my-0 sm:mr-12 font-semibold hover:text-violet-800'>Bienvenue { userData.username }</h5>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
            ) : (
                <ul className='li flex items-center m-7' aria-label='navigation links'>
                    <li>
                        <NavLink to='/profil'>
                            <FontAwesomeIcon icon={ faRightToBracket } className='icon hover:text-violet-900' aria-label='connection icon' />
                        </NavLink>
                    </li>
                </ul>
            ) }
        </nav>
    </header>
}

export default Header