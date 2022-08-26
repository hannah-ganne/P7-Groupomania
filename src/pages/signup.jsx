import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../utils/style/signup.css'
import { useForm } from "react-hook-form";

export default function Signup() {

    const [isUnique, setIsUnique] = useState(true)
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = data => {

        function signinFirstTime() {

            const signinOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': data.email,
                    'password': data.password
                })
            }
    
            fetch('http://localhost:3000/api/auth/login', signinOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`There's an error sending the data`)
            })
                .then(data => {
                sessionStorage.setItem('token', JSON.stringify(data.token))
                sessionStorage.setItem('userId', JSON.stringify(data.userId))
                sessionStorage.setItem('isAdmin', JSON.stringify(data.isAdmin))
                document.location.href = './profile/edit';
            })
            .catch(err => console.log(err))
    }

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        fetch ('http://localhost:3000/api/auth/signup', fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }

            if(res.status === 409) {
                setIsUnique(false)
                console.log(isUnique)
            }
            throw new Error(`HTTP : ${res.status} - ${res.statusText}`)
        })
        .then(data => {
            signinFirstTime()
        })
        .catch(err => console.log(err)); 
    console.log(data)
    };


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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            aria-label="input-first-name"
                            placeholder="First Name"
                            name="firstName"

                            {...register('firstName', {
                                pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                required: true
                            })}
                        />
                        {errors?.firstName?.type === 'required' && <small>This field is required</small>}
                        {errors?.firstName?.type === 'pattern' && <small>Only alphabetical characters are allowed</small>}
                        <input
                            aria-label="input-last-name"
                            placeholder="Last Name"
                            name="lastName"
                            {...register('lastName', {
                                pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                required: true
                            })}
                        />
                        {errors?.lastName?.type === 'required' && <small>This field is required</small>}
                        {errors?.lastName?.type === 'pattern' && <small>Only alphabetical characters are allowed</small>}
                        <input
                            aria-label="input-email-address"
                            placeholder="Email Address"
                            type="email"
                            name="email"
                            {...register('email', {
                                required: true
                            })}
                        />
                        {errors?.email?.type === 'required' && <small>This field is required</small>}
                        {!isUnique && <small>This email already exists</small>}
                        <input
                            aria-label="input-password"
                            type="password"
                            placeholder="Password"
                            name="password"
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
                        <input
                            aria-label="input-password-confirm"
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            required
                            {...register('confirmPassword', {
                                required: true,
                                validate: value =>
                                {
                                    if (watch('password') !== value) {
                                    return 'Passwords do not match'
                                    }}
                            })
                            }
                        />
                        {errors?.confirmPassword && <small>Passwords do not match</small>}
                        <Button className="btn red" name="Sign up" type="submit" />
                        <p>Already have an account? <Link to="/signin" className="bold">Sign in!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}