import Button from '../components/Button'
import '../utils/style/write.css'
import { topics } from '../docs/list'
import { useState } from 'react'

export default function Write() {

    const topicEl = topics.map(topic => {
        return <option key={topic.id} value={topic.label}>{topic.label}</option>
    })

    return (
        <section className="write">
            <form>
                <input type="text" placeholder="Title" required />
                <select required>
                    <option value="">Select topic</option>
                    {topicEl}
                </select>
                <textarea rows="30" cols="100">Start writing about the topic you chose.
                    Please be respectful of your co-workers and use respectful language.
                    If deemed inappropriate, the forum moderator can intervene.</textarea>
                <div>
                    <label for="image-upload" class="custom-image-upload btn">
                        Upload an image
                    </label>
                    <input type="file" id="image-upload" accept="image/png, image/jpeg, image/gif" />
                    <Button className="btn red" name="Post" />
                </div>
            </form>
        </section>
    )
}