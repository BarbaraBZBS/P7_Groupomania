import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import { useDispatch, useSelector } from 'react-redux'
import { updateName } from '../../actions/userActions'
import { isEmpty } from '../../utils'
import axios from '../../api/axios'
import cookie from 'js-cookie'


const UpdateProfil = () => {
    const userData = useSelector( ( state ) => state.userReducer )
    const error = useSelector( ( state ) => state.errorReducer.userError )
    const [ username, setUsername ] = useState( '' )
    const [ updateForm, setUpdateForm ] = useState( false )
    const dispatch = useDispatch()

    const HandleUpdate = () => {
        if ( username ) {
            dispatch( updateName( userData.id, username ) )
            setUpdateForm( false )
        }
        else {
            setUpdateForm( false )
        }
    }

    const removeCookie = ( key ) => {
        if ( typeof window !== 'undefined' ) {
            cookie.remove( key ) //{ expires: 1 }
        }
    }

    const HandleDelete = async () => {
        const answer = window.confirm( 'Êtes-vous sûr(e) de vouloir supprimer votre compte ? ' )
        if ( answer ) {
            return axios.delete( '/api/auth/user/' + userData.id )
                .then( ( res ) => {
                    console.log( 'deleted' )
                    axios.get( '/api/auth/logout',
                        { withCredentials: true }
                    )
                        .then( ( res ) => {
                            removeCookie( 'jwt' )
                            //console.log( res )
                            window.location = '/profil'
                        } )
                        .catch( error => console.log( error ) )
                } )
                .catch( error => console.error( error ) )
        }
        else {
            return
        }
    }

    return <main className='pb-6'>
        <LeftNav />
        <section className='userupd-container'>
            <h1 className='title2 sm:title1 sm:uppercase'> Profil de { userData.username }</h1>
            <p> { userData.email }</p>
            <br />
            <div className='mt-3'>
                <div className='userupd-card border-appstone' aria-label='modify name' role='region' tabIndex="0">
                    <h2 className='text-lg font-semibold sm:title2'>Modification du nom d'utilisateur</h2>
                    { updateForm === false && (
                        <>
                            <p onClick={ () => setUpdateForm( !updateForm ) }>
                                { userData.username }
                            </p>
                            { !isEmpty( error ) && <p className='text-xl font-semibold text-appred mt-2'
                                aria-live='assertive'>{ error }</p> }
                            <button className='btn btn-hover mt-4' onClick={ () => setUpdateForm( !updateForm ) }>
                                Modifier
                            </button>
                        </>
                    ) }
                    { updateForm && (
                        <>
                            <input className='input'
                                type='text'
                                defaultValue={ userData.username }
                                onChange={ ( e ) => setUsername( e.target.value ) } >
                            </input>
                            <br />
                            <button className='btn btn-hover mt-4' onClick={ HandleUpdate }>Valider</button>
                        </>
                    ) }
                </div>
                <br />
                <div className='userupd-card border-appred' aria-label='delete account' role='region' tabIndex="0">
                    <h2 className='text-lg font-semibold sm:title2'>Suppression du compte</h2>
                    <p>Vous avez la possiblité de supprimer votre compte</p>
                    <button className='btn-delete sm:w-64' onClick={ HandleDelete }>Supprimer mon compte</button>
                </div>
            </div>
        </section>
    </main>
}

export default UpdateProfil