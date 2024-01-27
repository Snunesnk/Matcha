import './Notifications.css'
import React, { useEffect, useState } from 'react'
import {
    Visibility,
    Favorite,
    PeopleAlt,
    FavoriteBorder,
    Search,
} from '@mui/icons-material'
import { formatTimeDifference } from '../MessagesLeftPane/MessagesLeftPane'
import ApiService from '../../Services/api.service'

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
            case 'interested':
                return 'is interested in your profile'
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
            case 'interested':
                return <Search />
            default:
                return <></>
        }
    }

    useEffect(() => {
        ApiService.get('/notifications').then((data) => {
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
                                        src={ApiService.getImgPath(
                                            notification.imgA
                                        )}
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
