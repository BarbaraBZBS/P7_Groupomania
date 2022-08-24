import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()

    const goBack = () => navigate( -1 )

    return <section>
        <h1>Non autorisé</h1>
        <br />
        <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
        <div className="flexGrow">
            <button onClick={ goBack }>Go Back</button>
        </div>
    </section>
}

export default Unauthorized