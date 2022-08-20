import { useRef, useState, useEffect } from 'react'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const LOGIN_URL = '/api/auth/login'

function Login() {
    const { setAuth } = useAuth()
    const userRef = useRef()
    const errRef = useRef()

    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ errMsg, setErrMsg ] = useState( '' )
    const [ success, setSuccess ] = useState( false )

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
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            console.log( response?.data )
            console.log( response )
            const token = response?.data?.token
            //const roles = response?.data?.roles
            setAuth( { email, password, token } )
            console.log( token )
            setEmail( '' )
            setPassword( '' )
            setSuccess( true )
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

    return <>
        { success ? (
            <section>
                <h1> Vous êtes authentifié ! </h1> <br />
                <p>
                    <Link to="/home"> Accueil </Link>
                </p>
            </section>
        ) : (
            <section className="login">
                <p ref={ errRef } className={ errMsg ? 'errMsg' : 'offscreen' }
                    aria-live='assertive'>{ errMsg }</p>
                <h1> Connexion </h1>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id='email'
                        ref={ userRef }
                        autoComplete='off'
                        onChange={ ( e ) => setEmail( e.target.value ) }
                        value={ email }
                        required
                    />

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id='password'
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        value={ password }
                        required
                    />
                    <br />
                    <button>Se Connecter</button>
                </form>
                <br />
                <p>
                    Besoin d'un compte ? <br />
                    <span>
                        <Link to="/signup">S'inscrire</Link>
                    </span>
                </p>
            </section>
        ) }
    </>
}

export default Login


