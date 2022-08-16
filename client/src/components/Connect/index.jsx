import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function Connect() {
    const [ SignupProcess, setSignupProcess ] = useState( false )
    const [ LoginProcess, setLoginProcess ] = useState( true )

    const handleProcess = ( e ) => {
        if ( e.target.id === 'login' ) {
            setLoginProcess( true )
            setSignupProcess( false )
        }
        else if ( e.target.id === 'signup' ) {
            setSignupProcess( true )
            setLoginProcess( false )
        }
    }

    return <div className="connect-form">
        <div className="connect-form_container">
            <ul>
                <li onClick={ handleProcess } id='login' className={ LoginProcess ? 'active-btn' : null }>Se Connecter</li>
                <li onClick={ handleProcess } id='signup' className={ SignupProcess ? 'active-btn' : null }>S'inscrire</li>
            </ul>
            { LoginProcess && <Login /> }
            { SignupProcess && <Signup /> }
        </div>
    </div>
}

export default Connect
