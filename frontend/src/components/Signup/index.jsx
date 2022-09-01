import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../api/axios'
import Login from '../Login'

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
const PASSWORD_REGEX = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/
const USER_REGEX = /^[a-zA-Z-_]{5,10}$/
const REGISTER_URL = '/api/auth/signup'

function Signup() {
    const userRef = useRef()
    const errRef = useRef()

    const [ username, setUserName ] = useState( '' )
    const [ validName, setValidName ] = useState( false )
    const [ userFocus, setUserFocus ] = useState( false )

    const [ email, setEmail ] = useState( '' )
    const [ validEmail, setValidEmail ] = useState( false )
    const [ emailFocus, setEmailFocus ] = useState( false )

    const [ password, setPassword ] = useState( '' )
    const [ validPwd, setValidPwd ] = useState( false )
    const [ pwdFocus, setPwdFocus ] = useState( false )

    const [ errMsg, setErrMsg ] = useState( '' )
    const [ success, setSuccess ] = useState( false )

    useEffect( () => {
        userRef.current.focus()
    }, [] )

    useEffect( () => {
        const result = USER_REGEX.test( username )
        console.log( result )
        console.log( username )
        setValidName( result )
    }, [ username ] )

    useEffect( () => {
        const result = EMAIL_REGEX.test( email )
        console.log( result )
        console.log( email )
        setValidEmail( result )
    }, [ email ] )

    useEffect( () => {
        const result = PASSWORD_REGEX.test( password )
        console.log( result )
        console.log( password )
        setValidPwd( result )
    }, [ password ] )

    useEffect( () => {
        setErrMsg( '' )
    }, [ username, email, password ] )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        console.log( username, email, password )
        // if button enabled with JS hack
        const v1 = USER_REGEX.test( username )
        const v2 = PASSWORD_REGEX.test( password )
        const v3 = EMAIL_REGEX.test( email )
        if ( !v1 || !v2 || !v3 ) {
            setErrMsg( 'Informations invalides' )
            return
        }
        try {
            const response = await axios.post( REGISTER_URL,
                JSON.stringify( { username, email, password } ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log( response?.data )
            console.log( JSON.stringify( response ) )
            setSuccess( true )
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUserName( '' )
            setEmail( '' )
            setPassword( '' )
        } catch ( err ) {
            if ( !err?.response ) {
                setErrMsg( 'Pas de réponse du serveur' )
            } else if ( err.response?.status === 409 ) {
                setErrMsg( 'Nom/email déja utilisé(s)' )
            } else {
                setErrMsg( 'Échec inscription' )
            }
            errRef.current.focus()
        }
    }

    return <>
        { success ? (
            <>
                <h4 className='success'>
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    &nbsp; Inscription validée ! Vous pouvez vous connecter.
                </h4>
                <span></span>
                <br />
                <Login />
            </>
        ) : (
            <section>
                <p ref={ errRef } className={ errMsg ? 'errmsg' : 'offscreen' } aria-live="assertive">{ errMsg }</p>
                <h1>Inscription</h1>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor="username">
                        Nom d'utilisateur :
                        <FontAwesomeIcon icon={ faCheck } className={ validName ? 'valid' : 'hide' } />
                        <FontAwesomeIcon icon={ faTimes } className={ validName || !username ? 'hide' : 'invalid' } />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={ userRef }
                        autoComplete="off"
                        onChange={ ( e ) => setUserName( e.target.value ) }
                        value={ username }
                        required
                        aria-invalid={ validName ? 'false' : 'true' }
                        aria-describedby="uidnote"
                        onFocus={ () => setUserFocus( true ) }
                        onBlur={ () => setUserFocus( false ) }
                    />
                    <p id="uidnote" className={ userFocus && username && !validName ? 'instructions' : 'offscreen' }>
                        <FontAwesomeIcon icon={ faInfoCircle } />
                        4 à 10 charactères.<br />
                        Lettres, _ , - authorisés.
                    </p>

                    <label htmlFor="email">
                        Email :
                        <FontAwesomeIcon icon={ faCheck } className={ validEmail ? 'valid' : 'hide' } />
                        <FontAwesomeIcon icon={ faTimes } className={ validEmail || !email ? 'hide' : 'invalid' } />
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={ ( e ) => setEmail( e.target.value ) }
                        value={ email }
                        required
                        aria-invalid={ validEmail ? 'false' : 'true' }
                        aria-describedby='emailnote'
                        onFocus={ () => setEmailFocus( true ) }
                        onBlur={ () => setEmailFocus( false ) }
                    />
                    <p id="emailnote" className={ emailFocus && !validEmail ? 'instructions' : 'offscreen' }>
                        <FontAwesomeIcon icon={ faInfoCircle } />
                        doit avoir un format email valide.<br />
                    </p>

                    <label htmlFor="password">
                        Mot de passe :
                        <FontAwesomeIcon icon={ faCheck } className={ validPwd ? 'valid' : 'hide' } />
                        <FontAwesomeIcon icon={ faTimes } className={ validPwd || !password ? 'hide' : 'invalid' } />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        value={ password }
                        required
                        aria-invalid={ validPwd ? 'false' : 'true' }
                        aria-describedby='pwdnote'
                        onFocus={ () => setPwdFocus( true ) }
                        onBlur={ () => setPwdFocus( false ) }
                    />
                    <p id="pwdnote" className={ pwdFocus && !validPwd ? 'instructions' : 'offscreen' }>
                        <FontAwesomeIcon icon={ faInfoCircle } />
                        6 à 15 charactères.<br />
                        au moins un nombre et une lettre
                    </p>
                    <br />
                    <button classname='bg-indigo-900 active:bg-appstone hover: bg-blue-900' disabled={ !validName || !validPwd ? true : false }>
                        Valider</button>
                </form>
            </section>
        ) }
    </>
}

export default Signup
