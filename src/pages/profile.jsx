import user from '../assets/user.png'
import '../utils/style/profile.css'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'
import { useState } from 'react'

export default function Profile() {
    const [myProfile, setMyProfile] = useState({})

    useFetch("GET", "http://localhost:3000/api/auth/viewProfile", setMyProfile,)
    
    return (
        <section className="profile">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-info">
                <div className="profile-avatar-readonly">
                    <Avatar />
                </div>    
                <div>
                    <p><span className="bold">Name: </span>{`${myProfile.firstName} ${myProfile.lastName}`}</p>
                    <p><span className="bold">Department: </span>{myProfile.department}</p>
                </div>
            </div>
            <div className="profile-detail">
                <span className="bold uppercase">At work I'm expert in...</span>
                <p>{myProfile.expertIn}</p>
                <span className="bold uppercase">Personally I'm interested in...</span>
                <p>{myProfile.interestedIn}</p>
                <span className="bold uppercase">Describe yourself in one word</span>
                <p>I am a <span className='bold uppercase'>{myProfile.oneWord}</span> person</p>
                <span className="bold uppercase">I am up for...</span>
                <p></p>
            </div>
            <Link to="/profile/edit">
                <Button className="btn red" name="Modify profile" />
            </Link>
        </section>
    )
}