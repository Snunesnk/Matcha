import './Notifications.css'
import React, { useEffect, useState } from 'react'
import {
    Visibility,
    Favorite,
    PeopleAlt,
    FavoriteBorder,
    FiberNew,
} from '@mui/icons-material'
import { formatTimeDifference } from '../MessagesLeftPane/MessagesLeftPane'

function Notifications() {
    const [notifications, setNotifications] = useState()
    // const notifications = [
    //     {
    //         type: 'like',
    //         user: 'John Doe',
    //         timestamp: 'Il y a 10 minutes',
    //         image: 'https://i.imgur.com/zYxDCQT.jpg',
    //         read: 'false',
    //     },
    //     {
    //         type: 'unlike',
    //         user: 'Richard Miles',
    //         timestamp: 'Il y a 20 minutes',
    //         image: 'https://i.imgur.com/w4Mp4ny.jpg',
    //         read: 'true',
    //     },
    //     {
    //         type: 'match',
    //         user: 'Sarah',
    //         timestamp: 'Il y a 30 minutes',
    //         image: 'https://i.imgur.com/ltXdE4K.jpg',
    //         read: 'true',
    //     },
    //     {
    //         type: 'match',
    //         user: 'Lisa',
    //         timestamp: 'Il y a 40 minutes',
    //         image: 'https://i.imgur.com/AbZqFnR.jpg',
    //         read: 'true',
    //     },
    //     {
    //         type: 'visit',
    //         user: 'Brian Cumin',
    //         timestamp: 'Il y a 50 minutes',
    //         image: 'https://i.imgur.com/ltXdE4K.jpg',
    //         read: 'true',
    //     },
    //     {
    //         type: 'visit',
    //         user: 'Lance Bogrol',
    //         timestamp: 'Il y a 60 minutes',
    //         image: 'https://i.imgur.com/CtAQDCP.jpg',
    //         read: 'true',
    //     },
    //     // Ajoutez plus de notifications ici si nécessaire
    // ]

    const getMessageByType = (type) => {
        switch (type) {
            case 'like':
                return 'has liked your profile'
            case 'unlike':
                return 'has unliked your profile'
            case 'match':
                return 'has matched with you'
            case 'visit':
                return 'has visited your profile'
            default:
                return ''
        }
    }

    const getIconByType = (type) => {
        switch (type) {
            case 'like':
                return <Favorite />
            case 'unlike':
                return <FavoriteBorder />
            case 'match':
                return <PeopleAlt />
            case 'visit':
                return <Visibility />
            default:
                return <></>
        }
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/notifications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setNotifications(data)
            })
    }, [])

    return (
        <div className="container">
            <h2>Notifications</h2>

            <div className="notification-content">
                {!notifications && <p>Loading...</p>}
                {notifications && notifications.length === 0 && (
                    <p>Nothing to see yet... Cat got your notifications?</p>
                )}
                {notifications &&
                    notifications.map((notification, index) => (
                        <div key={index} className="notification-list">
                            <div className="notification-list_content">
                                <div className="notification-list_img">
                                    <img
                                        src={notification.imgA}
                                        alt={notification.name}
                                    />
                                </div>

                                <div className="notification-list_detail">
                                    <p>
                                        <b>{notification.name}</b>{' '}
                                        {getMessageByType(notification.type)}
                                    </p>
                                    <p>
                                        <small>{notification.timestamp}</small>
                                    </p>
                                </div>
                            </div>

                            {getIconByType(notification.type)}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Notifications
