import { useState, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function useUser() {
    const [user, setUser] = useState<String>('')

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
