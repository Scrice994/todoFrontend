import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { UserEntity } from '../common/interfaces/UserEntity';

export default function useUser() {
    const [user, setUser] = useState<UserEntity>({
        username: '',
        userRole: '',
        tenantId: '',
        id: ''
    })

    const navigate = useNavigate()
    const initialData: any = useLoaderData()

    useEffect(() => {

        if(initialData){
            setUser(initialData.user)
        } else {
            navigate("/login")
        }

    }, []);


    return { user }
}
