import Button from '../components/Button'
import '../utils/style/write.css'
import { topics } from '../docs/list'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useFetch from '../utils/hooks/useFetch'


export default function EditPost() {

    let { id } = useParams();
    const { data, error, loading } = useFetch('GET', `http://localhost:3000/api/posts/${id}`)
    const [myPost, setMyPost] = useState(data)
    const topicEl = topics.map(topic => {
        return <option key={topic.id} value={topic.label}>{topic.label} </option>
    })

    // function handleChange(event) {
    //     const { name, value } = event.target

    //     setMyPost({ ...myPost, [name]: value })
    // }

    function handleSubmit(event) {
        event.preventDefault();

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            },
            body: JSON.stringify(myPost)
        }

        fetch (`http://localhost:3000/api/posts/${id}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = '../';
        })
        .catch(err => console.log(err)); 
    }

    if (error) {
        console.log(error)
    } 

    return (
    <>
        {loading && <div>Loading...</div>}
        {data &&
            <section className="write">
                <form onSubmit={handleSubmit}>
                    <input type="text" name='title' defaultValue={data.post.title} required />
                    <select required>
                        <option value="">Select topic</option>
                        {topicEl}
                    </select>
                    <textarea rows="30" cols="100" name='description' defaultValue={data.post.description}></textarea>
                    <div>
                        <label htmlFor="image-upload" className="custom-image-upload btn">
                            Upload an image
                        </label>
                        <input type="file" id="image-upload" accept="image/png, image/jpeg, image/gif" hidden/>
                        <Button className="btn red" name="Modify" type="submit"/>
                    </div>
                </form>
            </section>}
    </>
    )
}