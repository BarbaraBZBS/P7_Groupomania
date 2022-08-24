//import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//import useAuth from '../../hooks/useAuth'
//import AuthContext from '../../context/AuthProvider'
import useLogout from '../../hooks/useLogout'

const Welcome = () => {
    // const { setAuth } = useContext( AuthContext )
    const navigate = useNavigate()
    const logout = useLogout()


    const signOut = async () => {
        await logout()
        navigate( '/login' )
    }

    return <section>
        <h1>Bienvenue</h1>
        <br />
        <p>Vous êtes connecté !</p>
        <br />
        <Link to="/home">Aller dans mon espace</Link>
        <div className="flexGrow">
            <button onClick={ signOut }>Déconnexion</button>
        </div>
    </section>
}

export default Welcome