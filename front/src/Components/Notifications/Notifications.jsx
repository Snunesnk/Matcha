import './Notifications.css'
import React, { useEffect, useState } from 'react'
import {
    Visibility,
    Favorite,
    PeopleAlt,
    FavoriteBorder,
    FiberNew,
} from '@mui/icons-material'

function formatTimeDifference(dateString) {
    const currentDate = new Date()
    const inputDate = new Date(dateString)

    const timeDifference = currentDate - inputDate

    const minutes = Math.floor(timeDifference / (1000 * 60))
    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
        if (minutes < 1) {
            return 'now'
        }
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    } else {
        const options = { day: 'numeric', month: 'short' }
        return inputDate.toLocaleDateString('fr-FR', options)
    }
}

function Notifications() {
    const [notifications, setNotifications] = useState()

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
                        <div
                            key={index}
                            className={
                                'notification-list' +
                                (notification.read ? ' read' : '')
                            }
                        >
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
                                        <small>
                                            {formatTimeDifference(
                                                notification.created_at
                                            )}
                                        </small>
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
