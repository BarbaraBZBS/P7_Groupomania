import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    return <aside className='w-20 flex flex-col pb-6 p-3 asbolute'>
        <div className='icons fixed z-10'>
            <div className='icons-bis absolute left-3 pt-20'>
                <div className='h-5'>
                    <NavLink to='/' className={ ( navData ) => navData.isActive ? 'leftnav-active' : '' }>
                        <FontAwesomeIcon icon={ faHouse } className='leftnav-icon py-2' />
                    </NavLink>

                </div>
                <br />
                <div className='h-5'>
                    <NavLink to='/profil' className={ ( navData ) => navData.isActive ? 'leftnav-active' : '' }>
                        <FontAwesomeIcon icon={ faUser } className='leftnav-icon py-2' />
                    </NavLink>

                </div>
            </div>
        </div>
    </aside>
}

export default LeftNav