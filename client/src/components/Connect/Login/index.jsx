import { useState } from 'react'

function Login() {
    const [ username, setUsername ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const handleLogin = ( e ) => {
        e.preventDefault()
    }

    return <div className="login">
        <h1> Se connecter </h1>
        <p>
            Connectez-vous pour accèder à votre espace. <br />
            Pas de compte ?  Cliquez sur "S'inscrire".
        </p>

        <form action='' onSubmit={ handleLogin } id='login-form'>
            {/* <label htmlFor="username">Nom</label> <br />
            <input type="text" name='username' id='username' onChange={ ( e ) =>
                setUsername( e.target.value ) } value={ username } /> <br /> */}
            <label htmlFor="email">Email</label> <br />
            <input type="text" name='email' id='email' onChange={ ( e ) =>
                setEmail( e.target.value ) } value={ email } />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label> <br />
            <input type="text" name='password' id='password' onChange={ ( e ) =>
                setPassword( e.target.value ) } value={ password } />
            <div className="password error"></div>
            <br />
            <input type="submit" value='Se connecter' />
        </form>
    </div>
}

export default Login


