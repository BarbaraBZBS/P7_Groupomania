import { Link } from 'react-router-dom'

function Error() {
    return <div>
        <Link to="/"> Se Connecter </Link>
        <h1> Aïe! Cette page est inexistante !</h1>
    </div>
}

export default Error