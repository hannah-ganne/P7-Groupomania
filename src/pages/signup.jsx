import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import '../utils/style/signup.css'

export default function Signup() {
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
                    <form>
                        <input placeholder='First Name'/>
                        <input placeholder='Last Name'/>
                        <input placeholder='Email Address'/>
                        <input placeholder='Password'/>
                        <input placeholder='Confirm password'/>
                        <Button className="btn red" name="Sign up"/>
                        <p>Already have an account? <Link to="/signin" className='bold'>Sign in!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}