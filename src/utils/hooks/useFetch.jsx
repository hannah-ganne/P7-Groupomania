import { useEffect } from 'react'

export default function useFetch(method, url, callback, body) {
    useEffect(() => {
        const fetchOptions = {
            method: method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            },
            body: body
        }
    
        fetch(url, fetchOptions)
            .then(res => res.json())
            .then(data => callback(data))
    }, [])
}