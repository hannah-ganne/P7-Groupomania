import Button from '../components/Button'
import '../utils/style/write.css'
import { topics } from '../docs/list'
import { useParams } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'


export default function EditPost() {

    let { id } = useParams();
    const { data, setData, error, loading } = useFetch('GET', `http://localhost:3000/api/posts/${id}`)

    function handleChange(event) {
        const { name, value } = event.target

        setData(prev => ({
            ...prev,
            post: {
                ...prev.post,
                [name]: value
            }
        }))
        console.log(data.post)
    }

    function handleSubmit(event) {
        event.preventDefault();

        let input = document.getElementById('image-upload')
        let formData = new FormData();
        formData.append("title", data.post.title);
        formData.append("topic", data.post.topic);
        formData.append("description", data.post.description);
        formData.append("image", input.files[0]);

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            },
            body: formData
        }

        fetch (`http://localhost:3000/api/posts/${id}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = './';
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
                    <input type="text" name='title' defaultValue={data.post.title} onChange={handleChange} required />
                    <select name='topic' defaultValue={data.post.topic} onChange={handleChange} required>
                        <option value="">Select topic</option>
                        {topics.map(topic => {
                            return <option key={topic.id} value={topic.label}>{topic.label} </option>
                        })}
                    </select>
                    <textarea rows="30" cols="100" name='description' defaultValue={data.post.description} onChange={handleChange}></textarea>
                    <div>
                        <label htmlFor="image-upload" className="custom-image-upload btn">
                            Upload an image
                        </label>
                        <input type="file" name="image" id="image-upload" accept="image/png, image/jpeg, image/gif"/>
                        <Button className="btn red" name="Modify" type="submit"/>
                    </div>
                </form>
            </section>}
    </>
    )
}