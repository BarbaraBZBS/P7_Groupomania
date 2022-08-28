// import { useNavigate, Link } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
//import Users from '../Users'
//import useLogout from '../../hooks/useLogout'

function Admin() {
    // const { setAuth } = useAuth()
    // const navigate = useNavigate()
    // const logout = async () => {
    //     // if used in more components, this should be in context 
    //     // axios to /logout endpoint 
    //     setAuth( {} )
    //     navigate( '/linkpage' )
    // }

    return <section>
        <h1>Page Admin</h1>
        <br />
        {/* <Users /> */ }
        <br />
        <p>Vous pouvez accéder à votre espace Administrateur.</p>
        <Link to="/linkpage">Aller à la page de liens</Link>
        <div className="flexGrow">
            <Link to="/admin/home">Espace Admin</Link>

            {/* <button onClick={ logout }>Déconnexion</button> */ }
        </div>
    </section>
}

export default Admin