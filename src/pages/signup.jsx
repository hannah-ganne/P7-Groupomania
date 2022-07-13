import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../utils/style/signup.css'

export default function Signup() {
    const [signupData, setSignupData] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    function handleChange(event) {
        setSignupData({ ...signupData, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData)
        }

        fetch ("http://localhost:3000/api/auth/signup", fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = "http://localhost:3000/profile/edit";
        })
        .catch(err => console.log(err)); 
    
    }


    return (
        <>
            <header className="signup-header">
                <img src={logo} alt="groupomania"/>
                    <Link to="/signin">
                        <Button className="btn dark" name="Sign in" />
                    </Link>
            </header>
            <main className="signup-main">
                <div className="signup-form-container">
                    <h2>Sign up</h2>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='First Name' name='firstName' value={signupData.firstName} onChange={handleChange}/>
                        <input placeholder='Last Name' name='lastName' value={signupData.lastName} onChange={handleChange}/>
                        <input placeholder='Email Address' name='email' value={signupData.email} onChange={handleChange}/>
                        <input type="password" placeholder='Password' name='password' value={signupData.password} onChange={handleChange}/>
                        <input type="password" placeholder='Confirm password' name='confirmPassword' value={signupData.confirmPassword} onChange={handleChange}/>
                        <Button className="btn red" name="Sign up" type="submit"/>
                        <p>Already have an account? <Link to="/signin" className='bold'>Sign in!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}