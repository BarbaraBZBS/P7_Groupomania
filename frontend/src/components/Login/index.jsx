import { useRef, useState, useEffect } from 'react'
import axios from '../../api/axios'

const LOGIN_URL = '/api/auth/login'

function Login() {
    const userRef = useRef()
    const errRef = useRef()

    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ errMsg, setErrMsg ] = useState( '' )

    useEffect( () => {
        userRef.current.focus()
    }, [] )

    useEffect( () => {
        setErrMsg( '' )
    }, [ email, password ] )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        console.log( email, password )
        try {
            const response = await axios.post( LOGIN_URL,
                JSON.stringify( { email, password } ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log( JSON.stringify( response?.data ) )
            // const token = response?.data?.token
            const role = response?.data?.role
            //( [ response.data.userId, response.data.role, response.data.token ] ) )
            setEmail( '' )
            setPassword( '' )
            if ( role === 'user' ) {
                window.location = '/'
            } else if ( role === 'admin' ) {
                window.location = '/admin'
            }
        } catch ( err ) {
            if ( !err?.response ) {
                console.log( err )
                setErrMsg( 'Pas de réponse du serveur' )
            } else if ( err.response?.status === 400 ) {
                setErrMsg( 'email/mot de passe manquant(s) ou invalide(s)' )
            } else if ( err.response?.status === 401 ) {
                setErrMsg( 'Identifiant(s) incorrect(s)' )
            } else {
                setErrMsg( 'La connection au compte a échoué' )
                console.log( err.response )
            }
            errRef.current.focus()
        }
    }

    return <section className="flex flex-col w-full">
        <p ref={ errRef } className={ errMsg ? 'errMsg' : 'offscreen' }
            aria-live='assertive'>{ errMsg }</p>
        <h1 className='text-2xl font-semi-bold'> Connexion </h1>
        <form className='flex flex-col' onSubmit={ handleSubmit }>
            <label htmlFor="email" className='label'>Email</label>
            <input
                type="text"
                id='email'
                ref={ userRef }
                autoComplete='off'
                onChange={ ( e ) => setEmail( e.target.value ) }
                value={ email }
                required
            />

            <label htmlFor="password" className='label'>Mot de passe</label>
            <input
                type="password"
                id='password'
                onChange={ ( e ) => setPassword( e.target.value ) }
                value={ password }
                required
            />
            <br />
            <button className='btn btn-hover w-40'>Se Connecter</button>
        </form>
    </section>
}

export default Login


