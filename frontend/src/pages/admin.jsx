import useFetch from '../utils/hooks/useFetch'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../utils/style/components.css'

export default function Admin() {

    const { data, error, loading } = useFetch('GET', 'http://localhost:3000/api/auth/users')

    function deleteUser(userId) {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }

        fetch (`http://localhost:3000/api/auth/delete/${userId}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error(`There's an error sending the data`)
        })
        .then(data => {
            document.location.href = '/admin';
        })
        .catch(err => console.log(err)); 
    }

    function UserInfo(props) {

        return (
        <div className="user-info" id={props.id}>
            <Avatar src={props.imageUrl} alt="user's avatar"/>
            <p>
                <span className="bold">{`${props.firstName} ${props.lastName}`}</span>
                from {props.department ? <span className='bold'>{props.department}</span> : 'undefined '}
                joined on <span className='bold'>{new Date(props.createdAt).getDate() + '/' + (new Date(props.createdAt).getMonth()+1) + '/' + new Date(props.createdAt).getFullYear()}</span>        
            </p>        
            <IconButton className="delete-icon" onClick={(e) => deleteUser(e.target.closest('div').id)}>
                <DeleteIcon fontSize="medium" aria-label="delete-button" />
            </IconButton>
        </div>
        )
    }

    if (error) {
        console.log(error)
    }

    return (
        <>
            { loading && <div>Loading...</div> }
            { data && <section className="profile">
            <h2 className="profile-title">Admin Dashboard</h2>
                {data.map(user => {
                    return <UserInfo
                            key={user.id}    
                            id={user.id}
                            imageUrl={user.imageUrl}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            department={user.department}
                            expertIn={user.expertIn}
                            interestedIn={user.interestedIn}
                            oneWord={user.oneWord}
                            createdAt={user.createdAt}
                            isUpFor={user.isUpFor}
                            />
            })}
    </section>
    }
        </>
    )
}