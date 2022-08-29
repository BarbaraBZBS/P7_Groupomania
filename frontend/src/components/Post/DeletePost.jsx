import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/postActions'


const DeletePost = ( props ) => {
    const dispatch = useDispatch()

    const userDeletePost = () => {
        dispatch( deletePost( props.id ) )
    }

    return <div onClick={ () => {
        const answer = window.confirm( 'Êtes-vous sûr(e) de vouloir supprimer ce post ? ' )
        if ( answer ) {
            userDeletePost()
        } else return
    } }>
        <FontAwesomeIcon icon={ faTrashCan } className='delete-icon' />
    </div>
}

export default DeletePost