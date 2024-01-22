import { useEffect, useState } from 'react'
import './Profile.css'
import UserProfile from '../../Components/UserProfile/UserProfile';

const Profile = () => {
    const [me, setMe] = useState(null);

    useEffect(() => { fetch('http://localhost:8080/api/user/me', {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => { return response.json() })
        .then((data) => {
            data.user.tags = data.user.tags.map(tag => tag.bwid).join(', ');
            setMe(data.user);
        });
    }, [])

    return(
        <div className="profile-page">
            {me ? (
                <UserProfile user={me} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Profile