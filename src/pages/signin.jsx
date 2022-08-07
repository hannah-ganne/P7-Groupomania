import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../utils/style/signup.css'
import { useForm } from "react-hook-form";

export default function Signin() {
    // const [signinData, setSigninData] = useState({
    //     "email": "",
    //     "password": ""
    // })

    // function handleChange(event) {
    //     setSigninData({ ...signinData, [event.target.name]: event.target.value })
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();

        // const signinOptions = {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "email": signinData.email,
        //         "password": signinData.password
        //     })
        // }

        // fetch("http://localhost:3000/api/auth/login", signinOptions)
        //     .then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        //         throw new Error("There's an error sending the data")
        //     })
        //     .then(data => {
        //         sessionStorage.setItem("token", JSON.stringify(data.token))
        //         sessionStorage.setItem("userId", JSON.stringify(data.userId))
        //         sessionStorage.setItem("isAdmin", JSON.stringify(data.isAdmin))
        //         document.location.href = '/';
        //     })
        //     .catch(err => console.log(err))
    // }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const signinOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": data.email,
                "password": data.password
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
                sessionStorage.setItem("userId", JSON.stringify(data.userId))
                sessionStorage.setItem("isAdmin", JSON.stringify(data.isAdmin))
                document.location.href = '/';
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            placeholder='Email Address'
                            type='email'
                            name='email'
                            {...register('email', {
                                required: true
                            })}
                            // value={signinData.email}
                            // onChange={handleChange} 
                        />
                        {errors?.email?.type === 'required' && <small>This field is required</small>}
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            // value={signinData.password}
                            // onChange={handleChange} 
                            {...register('password', {
                                required: "You must specify a password",
                                minLength: 8,
                                maxLength: 20,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.{2,}\d)[A-Za-z\d]{8,20}$/g,
                                })
                            }
                        />
                        {errors?.password?.type === 'minLength' && <small>Password must have at least 8 characters</small>}
                        {errors?.password?.type === 'maxLength' && <small>Password cannot have more than 20 characters</small>}
                        {errors?.password?.type === 'pattern' && <small>Password must contain at least 2 digits, 1 uppercase and 1 lowercase letter.</small>}
                        <Button className="btn red" name="Sign in" type="submit"/>
                        <p>You don't have an account? <Link to="/signup" className="bold">Sign up!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}
