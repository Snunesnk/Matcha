import "./Notifications.css"
import React from 'react';
import { Visibility, Favorite, PeopleAlt, FavoriteBorder } from '@mui/icons-material'

function Notifications() {
  const notifications = [
    { type: 'like', user: 'John Doe', timestamp: 'Il y a 10 minutes', image: 'https://i.imgur.com/zYxDCQT.jpg' },
    { type: 'unlike', user: 'Richard Miles', timestamp: 'Il y a 20 minutes', image: 'https://i.imgur.com/w4Mp4ny.jpg' },
    { type: 'match', user: 'Sarah', timestamp: 'Il y a 30 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { type: 'match', user: 'Lisa', timestamp: 'Il y a 40 minutes', image: 'https://i.imgur.com/AbZqFnR.jpg' },
    { type: 'visit', user: 'Brian Cumin', timestamp: 'Il y a 50 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { type: 'visit', user: 'Lance Bogrol', timestamp: 'Il y a 60 minutes', image: 'https://i.imgur.com/CtAQDCP.jpg' },
    // Ajoutez plus de notifications ici si nécessaire
  ];

  const getMessageByType = (type) => {
    switch (type) {
      case 'like':
        return 'has liked your profile';
      case 'unlike':
        return 'has unliked your profile';
      case 'match':
        return 'has matched with you';
      case 'visit':
        return 'has visited your profile';
      default:
        return '';
    }
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'like':
        return <Favorite />;
      case 'unlike':
        return <FavoriteBorder />;
      case 'match':
        return <PeopleAlt />;
      case 'visit':
        return <Visibility />;
      default:
        return <></>;
    }
  };

  return (
    <div className="container">
      <h2>Notifications</h2>

      <div className="notification-content">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-list">
            <div className="notification-list_content">

              <div className="notification-list_img">
                <img src={notification.image} alt={notification.user} />
              </div>

              <div className="notification-list_detail">
                <p><b>{notification.user}</b> {getMessageByType(notification.type)}</p>
                <p className="text-muted"><small>{notification.timestamp}</small></p>
              </div>
            </div>
            
            {getIconByType(notification.type)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;