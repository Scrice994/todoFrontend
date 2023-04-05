import React from "react"
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { AuthToken } from "../common/services/AuthToken";
import { useNavigate } from "react-router-dom";

interface HeaderProps{
    openModal: () => void
    user: String
}

export const Header: React.FC<HeaderProps> = ({openModal, user}) => {

    const navigate = useNavigate()
    const token = new AuthToken('user')

    const logoutHandler = () => {
        token.removeToken()
        navigate('/login')
    }

    return(
        <div className="header">  
            <h2 data-cy="header">Welcome {user}, Your tasks are:</h2>
            <div className="user-menu">
                <MdOutlinePlaylistRemove 
                    className="delete-list"
                    data-cy="remove-list"
                    onClick={openModal}
                />
                <h3 onClick={logoutHandler} className='logout'>Logout</h3>
            </div>
        </div>
    )
}