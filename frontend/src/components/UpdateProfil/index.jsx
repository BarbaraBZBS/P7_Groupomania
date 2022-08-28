import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import { useDispatch, useSelector } from 'react-redux'
import { updateName } from '../../actions/userActions'
import axios from '../../api/axios'
import cookie from 'js-cookie'


const UpdateProfil = () => {
    const userData = useSelector( ( state ) => state.userReducer )
    const [ username, setUsername ] = useState( '' )
    const [ updateForm, setUpdateForm ] = useState( false )
    const dispatch = useDispatch()

    const HandleUpdate = () => {
        dispatch( updateName( userData.id, username ) )
        setUpdateForm( false )
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
                        .then( ( response ) => {
                            removeCookie( 'jwt' )
                            //console.log( response )
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

    return <section className='profil-container'>
        <LeftNav />
        <h1> Profil de { userData.username }</h1>
        <p> { userData.email }</p>
        <br />
        <div className='update-container'>
            <div className='name-update'>
                <h3>Modification du nom d'utilisateur</h3>
                { updateForm === false && (
                    <>
                        <p onClick={ () => setUpdateForm( !updateForm ) }>
                            { userData.username }
                        </p>
                        <button onClick={ () => setUpdateForm( !updateForm ) }>
                            Modifier
                        </button>
                    </>
                ) }
                { updateForm && (
                    <>
                        <input type='text' defaultValue={ userData.username } onChange={ ( e ) => setUsername( e.target.value ) } ></input>
                        <button onClick={ HandleUpdate }>Valider</button>
                    </>
                ) }
            </div>
            <br />
            <div className='user-delete'>
                <h3>Suppression du compte</h3>
                <p>Vous avez la possiblité de supprimer votre compte</p>
                <button onClick={ HandleDelete }>Supprimer mon compte</button>
            </div>
        </div>
    </section>
}

export default UpdateProfil