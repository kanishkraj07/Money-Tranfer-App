import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function useUser() {
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                Authorization: `Bearer ${token}` ,
            }
        }).then((response) => {
            setUserDetails(response.data.user)
        }).catch(e => {
        })
    }, [])
    return userDetails;
}