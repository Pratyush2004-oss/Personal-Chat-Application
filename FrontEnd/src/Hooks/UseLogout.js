import react, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext'
import toast from 'react-hot-toast'


const UseLogout = () => {
    const [ loading, setloading ] = useState(false)
    const {setauthUser} = useAuthContext()

    const logout = async () => {
        setloading(true)
        try {
            const res = await fetch("/api/auth/logout",{
                method: "POST",
                headers:{"Content-Type" : "application/json"}
            });

            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }

            // localstorage
            localStorage.removeItem("chat-user")

            // context
            setauthUser(null);
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setloading(false)
        }
    }

    return {loading, logout}
}

export default UseLogout