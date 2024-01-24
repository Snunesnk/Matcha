import { useEffect, useState } from 'react'
import './Profile.css'
import UserProfile from '../../Components/UserProfile/UserProfile'

const Profile = () => {
    const [me, setMe] = useState(null);
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        fetch('http://localhost:8080/api/user/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                data.user.tags = data.user.tags
                    .map((tag) => tag.bwid)
                    .join(', ')
                data.user.distance = 0
                setMe(data.user)
            })
    }, [])

    return(
        <div className="profile-page" onScroll={(e) => setScroll(e.target.scrollTop)}>
            {me ? (
                <UserProfile user={me} scroll={scroll}/>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Profile
