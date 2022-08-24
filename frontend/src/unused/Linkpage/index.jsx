import { Link } from 'react-router-dom'

const LinkPage = () => {
    return <section>
        <h1>Liens</h1>
        <br />
        <h2>Publique</h2>
        <Link to="/login">Connexion</Link>
        <Link to="/signup">Inscription</Link>
        <br />
        <h2>Privé</h2>
        <Link to="/home">Accueil</Link>
        <Link to="/admin">Page Admin</Link>
    </section>
}

export default LinkPage