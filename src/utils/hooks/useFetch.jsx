import { useState, useEffect } from 'react'

export default function useFetch(method, url, body = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
            .then(data => {
                setData(data);
                setLoading(false);
                console.log(data)
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
    }, []);

    return { data, loading, error };
};
// import { useState, useEffect } from 'react'

// export default function useFetch(url, fetchOptions) {
//     const [data, setData] = useState();
//     const [error, setError] = useState();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         fetch(url, fetchOptions)
//             .then(res => res.json())
//             .then(data => setData(data))
//             .catch(err => setError(err))
//             .finally(() => setLoading(false));
//     }, [url]);

//     return { data, error, loading };
// };

// export default function useFetch(method, url, callback, body) {
    
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     let fetchState = loading

//     useEffect(() => {
        // const fetchOptions = {
        //     method: method,
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        //     },
        //     body: body
        // }
    
//         fetch(url, fetchOptions)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error(
//                         `This is an HTTP error: The status is ${res.status}`
//                     );
//                 }
//                 return res.json();
//             })
//             .then(data => callback(data))
//             .finally(() => {
//                 setLoading(false)
//             })
//             .catch((err) => {
//                 setError(err)
//             })
//     }, [])

//     return fetchState
// }