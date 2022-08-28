import { useState } from 'react'
import Login from '../Login'
import Signup from '../Signup'


const Log = ( props ) => {

    const [ SignupProcess, setSignupProcess ] = useState( props.signup )
    const [ LoginProcess, setLoginProcess ] = useState( props.login )

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

    return <>
        <div>
            <p>
                <button onClick={ handleProcess } id='login'
                    className={ LoginProcess ? 'active-btn' : null }>Se Connecter</button>
            </p>
            <p>
                <button onClick={ handleProcess } id='signup'
                    className={ SignupProcess ? 'active-btn' : null }>S'inscrire</button>
            </p> <br />
            { LoginProcess && <Login /> }
            { SignupProcess && <Signup /> }
        </div>
    </>
}

export default Log