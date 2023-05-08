import React from "react"
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { LocalStorageHandler } from "../common/services/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserEntity } from "../common/interfaces/UserEntity";

interface HeaderProps{
    openModal: () => void
    user: UserEntity
}

export const Header: React.FC<HeaderProps> = ({openModal, user}) => {

    const navigate = useNavigate()
    const token = new LocalStorageHandler('user')

    const logoutHandler = () => {
        token.removeToken()
        navigate('/login')
    }

    const addUser = () => {
        navigate('admin/create-new-user')
    }

    return(
        <div className="header">  
            <h2 data-cy="header">Welcome {user.username}, Your tasks are:</h2>
            <div className="user-menu">
                {user.tenantId && user.userRole === 'Admin' && 
                    <FaUserPlus 
                        className="delete-list"
                        data-cy="admin-create-user"
                        onClick={addUser}
                    />
                }
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