import { Link } from 'react-router-dom'

function Admin() {
    return <section>
        <h1>Page Admin</h1>
        <br />
        <p>Vous pouvez accéder à votre espace Administrateur.</p>
        <div className="flexGrow">
            <Link to="/">Home</Link>
        </div>
    </section>
}

export default Admin