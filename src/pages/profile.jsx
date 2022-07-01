import user from '../assets/user.png'

export default function Profile() {
    return (
        <section>
            <h2>Profile</h2>
            <div className="profile-info">
                <img src={user} alt="user avatar"></img>
                <p><span className="bold">Name: </span>Hannah Ganne</p>
                <p><span className="bold">Department: </span>IT</p>
            </div>
            <div className="profile-detail">
                <h3>At work I'm expert in...</h3>
                
            </div>
        </section>
    )
}