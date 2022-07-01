import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import '../utils/style/signup.css'

export default function Signin() {
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
                    <form>
                        <input placeholder='Email Address'/>
                        <input placeholder='Password'/>
                        <Button className="btn red" name="Sign in"/>
                        <p>You don't have an account? <Link to="/signup" className="bold">Sign up!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}