import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/postActions'


const DeletePost = ( props ) => {
    const dispatch = useDispatch()

    const userDeletePost = () => {
        dispatch( deletePost( props.id ) )
    }

    return <div className='ml-1 mr-3 my-1' onClick={ () => {
        const answer = window.confirm( 'Êtes-vous sûr(e) de vouloir supprimer ce post ? ' )
        if ( answer ) {
            userDeletePost()
        } else return
    } }>
        <FontAwesomeIcon icon={ faTrashCan } className='text-appred cursor-pointer' />
    </div>
}

export default DeletePost