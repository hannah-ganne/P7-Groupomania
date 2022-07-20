import Avatar from '../components/Avatar'
import '../utils/style/profile.css'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import useFetch from '../utils/hooks/useFetch'
import { departments, oneWord, isUpFor } from '../docs/list'
import Checkbox from '../components/Checkbox'

export default function EditProfile() {
    const [myProfile, setMyProfile] = useState({})
    const [isUpForArray, setIsUpForArray] = useState(isUpFor) 

    useFetch("get", "http://localhost:3000/api/auth/viewProfile", setMyProfile)

    const deptEl = departments.map(dept => {
        return <option key={dept.id} value={dept.label}>{dept.label}</option>
    })

    const oneWordEl = oneWord.map(word => {
        return (
            <div>
                <input type="radio" key={word.id} id={word.id} name="oneWord" value={word.label} checked={myProfile.oneWord === word.label} />
                <label key={word.label} htmlFor={word.id}>{word.label}</label>
            </div>
        )
    })

    const isUpForEl = isUpForArray.map((item, index) => (
        <Checkbox
            key={item.label}
            isChecked={item.checked}
            checkHandler={() => handleCheck(index)}
            label={item.label}
            index={index}
        />
    ))
    // const isUpForEl = isUpFor.map(item => {
    //     return (
    //         <div>
    //             <input type="checkbox" key={item.id} id={item.id} name="isUpFor" value={item.label} />
    //             <label key={item.label} htmlFor={item.id}>{item.label}</label>
    //         </div>
    //     )
    // })

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        setMyProfile({ ...myProfile, [name]: value })
    }

    function handleCheck(index) {
        setIsUpForArray(
            isUpForArray.map((item, currentIndex) =>
            currentIndex === index
                ? { ...item, checked: !item.checked }
                : item
            )
        )
    }

    useEffect(() => {
        let checkedItems = isUpForArray.filter(item => item.checked)
        setMyProfile({ ...myProfile, isUpFor: [...checkedItems] })
    }, [isUpForArray])

    function handleSubmit(event) {
        event.preventDefault();

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            },
            body: JSON.stringify(myProfile)
        }

        fetch ("http://localhost:3000/api/auth/setProfile", fetchOptions)
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

    console.log(myProfile)

    return (
        <section className="profile">
            <h2 className="profile-title">Profile</h2>
            <form onSubmit={handleSubmit} >
                <div className="profile-info">
                    <div className="profile-avatar">
                        <Avatar />
                        <label htmlFor="modify-profile" className="btn avatar-btn">
                            Modify
                        </label>
                        <input type="file" id="modify-profile" accept="image/png, image/jpeg, image/gif" />   
                    </div>     
                    <div>
                        <p>
                            <span className="bold">First Name: </span>
                            <input type="text" placeholder={myProfile.firstName} name='firstName' value={myProfile.firstName} onChange={handleChange}></input>
                        </p>
                        <p>
                            <span className="bold">Last Name: </span>
                            <input type="text" placeholder={myProfile.lastName} name='lastName' value={myProfile.lastName} onChange={handleChange}></input>
                        </p>
                        <p>
                                <span className="bold">Department: </span>
                                <select name="department" value={myProfile.department} onChange={handleChange}>
                                    <option value="">Choose your department</option>
                                    {deptEl}
                                </select>
                        </p>
                    </div>
                </div>
                <div className="profile-detail">
                    <span className="bold uppercase">At work I'm expert in...</span>
                    <input type="text" placeholder={myProfile.expertIn} name='expertIn' value={myProfile.expertIn} onChange={handleChange}></input>
                    <span className="bold uppercase">Personally I'm interested in...</span>
                    <input type="text" placeholder={myProfile.interestedIn} name='interestedIn' value={myProfile.interestedIn} onChange={handleChange}></input>
                    <span className="bold uppercase">Describe yourself in one word</span>
                    <div className="oneWord" value={myProfile.oneWord} onChange={handleChange}>
                        {oneWordEl}
                        <div>
                            <input type="radio" name="oneWord" value="" /><input type="text" placeholder="Enter a word" />
                        </div>
                    </div>
                    <span className="bold uppercase">I am up for...</span>
                    <div className="isUpFor">
                        {isUpForEl}
                        <div>
                            <input type="checkbox" name="isUpFor" value="" /><input type="text" placeholder="Enter your idea" />
                        </div>
                    </div>
                </div>
                <Button className="btn red" name="Confirm changes" type="submit" /> 
            </form>
    </section>
    )
}