import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    return <aside className='left-nav-container'>
        <div className='icons'>
            <div className='icons-bis'>
                <NavLink to='/' className={ ( navData ) => navData.isActive ? 'active-left-nav' : '' }>
                    <FontAwesomeIcon icon={ faHouse } className='left-nav' />
                </NavLink>
                <br />
                <NavLink to='/profil' className={ ( navData ) => navData.isActive ? 'active-left-nav' : '' }>
                    <FontAwesomeIcon icon={ faUser } className='left-nav' />
                </NavLink>
            </div>
        </div>
    </aside>
}

export default LeftNav