import { Link } from 'react-router-dom'

function Error() {
    return <section>
        <Link to="/"> Se Connecter </Link>
        <h1> Aïe! Cette page est inexistante !</h1>
    </section>
}

export default Error