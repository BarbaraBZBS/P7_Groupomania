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

    return <main className='app'>
        <div className='flex flex-row border-2 border-apppink rounded-xl py-20 px-10 w-7/12 bg-apppinklight shadow-xl'>
            <div className='flex flex-col m-12 justify-center'>
                <button onClick={ handleProcess } id='login'
                    className={ LoginProcess ? 'btn-active' : 'btn btn-hover' }>Connexion</button>
                <br />
                <button onClick={ handleProcess } id='signup'
                    className={ SignupProcess ? 'btn-active' : 'btn btn-hover' }>Inscription</button>
            </div>

            { LoginProcess && <Login /> }
            { SignupProcess && <Signup /> }

        </div>
    </main>
}

export default Log