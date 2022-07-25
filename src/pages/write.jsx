import Button from '../components/Button'
import '../utils/style/write.css'
import { topics } from '../docs/list'
import { useState } from 'react'
import axios from 'axios'

export default function Write() {
    const [myPost, setMyPost] = useState({
        title: "",
        topic: "",
        description: ""
    })
    const [selectedFile, setSelectedFile] = useState("");

    const topicEl = topics.map(topic => {
        return <option key={topic.id} value={topic.label}>{topic.label}</option>
    })

    function handleChange(event) {
        const { name, value } = event.target

        setMyPost({ ...myPost, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("title", myPost.title);
        formData.append("topic", myPost.topic);
        formData.append("description", myPost.description);
        formData.append("file", selectedFile);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                // "content-type": "multipart/form-data",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            },
            body: formData
        }

        fetch ('http://localhost:3000/api/posts', fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = '/';
        })
        .catch(err => console.log(err)); 
    }

    console.log(myPost)

    return (
        <section className='write'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' name='title' value={myPost.title} onChange={handleChange} required />
                <select name='topic' value={myPost.topic} onChange={handleChange} required>
                    <option value=''>Select topic</option>
                    {topicEl}
                </select>
                <textarea
                    rows='30'
                    cols='100'
                    placeholder='Start writing about the topic you chose.
                    Please be respectful of your co-workers and use respectful language.
                    If deemed inappropriate, the forum moderator can intervene.'
                    name='description'
                    value={myPost.description}
                    onChange={handleChange}>    
                </textarea>
                <div>
                    <label htmlFor="image-upload" className="custom-image-upload btn">
                        Upload an image
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/png, image/jpeg, image/gif"
                        value=""
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        hidden
                    />
                    <Button className="btn red" name="Post" type="submit" />
                </div>
            </form>
        </section>
    )
}