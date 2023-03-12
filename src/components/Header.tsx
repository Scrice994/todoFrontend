import React from "react"
import { MdOutlinePlaylistRemove } from "react-icons/md";

interface HeaderProps{
    openModal: () => void
}

export const Header: React.FC<HeaderProps> = ({openModal}) => {
    return(
        <div className="header">  
            <h2>Welcome User, Your tasks are:</h2>
            <div>
                <MdOutlinePlaylistRemove 
                    className="delete-list"
                    onClick={openModal}
                />
            </div>
        </div>
    )
}