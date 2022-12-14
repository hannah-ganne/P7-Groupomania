import { Link } from 'react-router-dom'
import Button from '../components/Button'
import '../utils/style/error.css'


export default function Error() {

    return (
        <section className="error-section">
            <div className="emptyMsg">
                <p><span className="font-red">Oops.</span> <br /> 
                It seems like there's no such post in this forum. <br/><br/>
                    Start posting to say hello to your co-workers!</p>
                <Link to="/write">
                    <Button className="btn red" name="Start Posting"/>
                </Link>
            </div>
        </section>
    )
}