import Avatar from '../components/Avatar'
import '../utils/style/profile.css'
import Button from '../components/Button'

export default function EditProfile() {
    return (
        <section className="profile">
        <h2 className="profile-title">Profile</h2>
        <div className="profile-info">
            <div className="profile-avatar">
                <Avatar />
                <label for="modify-profile" class="btn avatar-btn">
                    Modify
                </label>
                <input type="file" id="modify-profile" accept="image/png, image/jpeg, image/gif" />   
            </div>     
            <div>
                <p>
                    <span className="bold">First Name: </span>
                    <input type="text" placeholder="Hannah"></input>
                </p>
                <p>
                    <span className="bold">Last Name: </span>
                    <input type="text" placeholder="Ganne"></input>
                </p>
                <p>
                        <span className="bold">Department: </span>
                        <select>
                            <option value="">Choose your department</option>
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="IT" selected>IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                            <option value="Purchase">Purchase</option>
                            <option value="Sales">Sales</option>
                        </select>
                </p>
            </div>
        </div>
        <div className="profile-detail">
            <span className="bold uppercase">At work I'm expert in...</span>
            <input type="text" placeholder="Workflow management, Frontend development"></input>
            <span className="bold uppercase">Personally I'm interested in...</span>
            <input type="text" placeholder="Parenting advice, yoga"></input>
            <span className="bold uppercase">Describe yourself in one word</span>
                <div>
                    
                <input type="radio" name="oneWord" value="Strategic" />Strategic
                <input type="radio" name="oneWord" value="Insightful" />Insightful
                <input type="radio" name="oneWord" value="Determined" />Determined
                <input type="radio" name="oneWord" value="Explorative" />Explorative
                <input type="radio" name="oneWord" value="Forward-looking" />Forward-looking
                <input type="radio" name="oneWord" value="Genuine" />Genuine
                <input type="radio" name="oneWord" value="Supportive" />Supportive
                <input type="radio" name="oneWord" value="Dedicated" checked />Dedicated
                <input type="radio" name="oneWord" value="Caring" />Caring
                <input type="radio" name="oneWord" value="Dependable" />Dependable
                <input type="radio" name="oneWord" value="Nurturing" />Nurturing
                <input type="radio" name="oneWord" value="Easy-going" />Easy-going
                <input type="radio" name="oneWord" value="Artistic" />Artistic
                <input type="radio" name="oneWord" value="Exciting" />Exciting
                <input type="radio" name="oneWord" value="Entertaining" />Entertaining
                <input type="radio" name="oneWord" value="" /><input type="text" placeholder="Enter a word" />
            </div>
            <span className="bold uppercase">I am up for...</span>
            <div>
                <input type="checkbox" value="Coffee chat" checked />Coffee chat
                <input type="checkbox" value="Zoom meetings" checked />Zoom meetings
                <input type="checkbox" value="Conferences" />Conferences
                <input type="checkbox" value="Office parties" checked />Office parties
                <input type="checkbox" value="Collaborations" checked />Collaborations
                <input type="checkbox" value="Afterwork happy hour" checked />Afterwork happy hour
                <input type="checkbox" value="Lunch meeting" />Lunch meeting
                <input type="checkbox" value="Book club" />Book club
                <input type="checkbox" value="" /><input type="text" placeholder="Enter your idea" />
            </div>
        </div>
        <Button className="btn red" name="Confirm changes" />    
    </section>
    )
}