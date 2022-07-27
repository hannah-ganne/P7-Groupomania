import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../utils/style/signup.css'

export default function Signin() {
    const [signinData, setSigninData] = useState({
        "email": "",
        "password": ""
    })

    function handleChange(event) {
        setSigninData({ ...signinData, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault();

        const signinOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": signinData.email,
                "password": signinData.password
            })
        }

        fetch("http://localhost:3000/api/auth/login", signinOptions)
            .then(res => {
            if (res.ok) {
                return res.json();
            }
                throw new Error("There's an error sending the data")
            })
            .then(data => {
                sessionStorage.setItem("token", JSON.stringify(data.token))
                sessionStorage.setItem("isAdmin", JSON.stringify(data.isAdmin))
                document.location.href = './';
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <header className="signup-header">
                <img src={logo} alt="groupomania" />
                <Link to="/signup">
                    <Button className="btn dark" name="Sign up"/>
                </Link>
            </header>
            <main className="signup-main">
                <div className="signup-form-container">
                    <h2>Sign in</h2>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='Email Address' name='email' value={signinData.email} onChange={handleChange}/>
                        <input type='password' placeholder='Password' name='password' value={signinData.password} onChange={handleChange} />
                        <Button className="btn red" name="Sign in" type="submit"/>
                        <p>You don't have an account? <Link to="/signup" className="bold">Sign up!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}