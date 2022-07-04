import Button from '../components/Button'
import '../utils/style/write.css'

export default function Write() {
    return (
        <section className="write">
            <form>
                <input type="text" placeholder="Title" required />
                <select required>
                    <option value="">Select topic</option>
                    <option value="News">News</option>
                    <option value="Team building">Team building</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Communication">Communication</option>
                    <option value="Career">Career</option>
                    <option value="Technology">Technology</option>
                    <option value="Networking">Networking</option>
                    <option value="Just for laughs">Just for laughs</option>
                    <option value="Suggestions">Suggestions</option>
                    <option value="Insight">Insight</option>
                    <option value="Industry">Industry</option>
                    <option value="Events">Events</option>
                    <option value="Learning and development">Learning and development</option>
                    <option value="Other topics">Other topics</option>
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