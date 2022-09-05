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

    return <section className='app'>
        <div className='log-container'>
            <div className='log'>
                <button onClick={ handleProcess } id='login'
                    className={ LoginProcess ? 'btn-active' : 'btn btn-hover' }>Connexion</button>
                <br />
                <button onClick={ handleProcess } id='signup'
                    className={ SignupProcess ? 'btn-active' : 'btn btn-hover' }>Inscription</button>
            </div>

            { LoginProcess && <Login /> }
            { SignupProcess && <Signup /> }

        </div>
    </section>
}

export default Log