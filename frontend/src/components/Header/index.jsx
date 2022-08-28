import Logo from '../../assets/icon-left-font.png'
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

    return <header className='Header'>
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink to='/'>
                        <img src={ Logo } alt='Logo Groupomania' />
                    </NavLink>
                </div>
            </div>
            { uid ? (
                <ul className='user'>
                    <li></li>
                    <li className='welcome'>
                        <NavLink to='/profil'>
                            <h5>Bienvenue { userData.username }</h5>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
            ) : (
                <ul className='user'>
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