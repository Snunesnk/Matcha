import { useEffect, useState } from 'react'
import './Profile.css'
import UserProfile from '../../Components/UserProfile/UserProfile'
import ApiService from '../../Services/api.service'

const Profile = () => {
    const [me, setMe] = useState(null);
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        ApiService.get('/user/me')
            .then((data) => {
                data.user.tags = data.user.tags
                    .map((tag) => tag.bwid)
                    .join(', ')
                data.user.distance = 0
                setMe(data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return(
        <div className="profile-page" onScroll={(e) => setScroll(e.target.scrollTop)}>
            {me ? (
                <UserProfile user={me} scroll={scroll} isMe={true}/>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Profile
