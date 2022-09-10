import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    return <aside className='w-20 flex flex-col pb-6 p-3 asbolute'>
        <nav className='fixed z-10'>
            <div className='absolute pt-20 left-[-10px] sm:left-0 lg:left-3'>
                <div className='h-5'>
                    <NavLink to='/' aria-label='home' className={ ( navData ) => navData.isActive ? 'leftnav-active' : '' }>
                        <FontAwesomeIcon icon={ faHouse } className='leftnav-icon py-2' />
                    </NavLink>

                </div>
                <br />
                <div className='h-5'>
                    <NavLink to='/profil' aria-label='profil' className={ ( navData ) => navData.isActive ? 'leftnav-active' : '' }>
                        <FontAwesomeIcon icon={ faUser } className='leftnav-icon py-2' />
                    </NavLink>

                </div>
            </div>
        </nav>
    </aside>
}

export default LeftNav