import "./Notifications.css"
import React from 'react';

function Notifications() {
  const notifications = [
    { type: 'like', user: 'John Doe', action: 'a aimé votre profil', timestamp: 'Il y a 10 minutes', image: 'https://i.imgur.com/zYxDCQT.jpg' },
    { type: 'like', user: 'Richard Miles', action: 'a aimé votre profil', timestamp: 'Il y a 20 minutes', image: 'https://i.imgur.com/w4Mp4ny.jpg' },
    { type: 'match', user: 'Sarah', action: 'a matché avec vous', timestamp: 'Il y a 30 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { type: 'match', user: 'Lisa', action: 'a matché avec vous', timestamp: 'Il y a 40 minutes', image: 'https://i.imgur.com/AbZqFnR.jpg' },
    { type: 'visit', user: 'Brian Cumin', action: 'a visité votre profil', timestamp: 'Il y a 50 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { type: 'visit', user: 'Lance Bogrol', action: 'a visité votre profil', timestamp: 'Il y a 60 minutes', image: 'https://i.imgur.com/CtAQDCP.jpg' },
    // Ajoutez plus de notifications ici si nécessaire
  ];

  return (
    <div className="container">
      <h3>Notifications</h3>

      <div className="notification-content">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-list">
            <div className="notification-list_content">

              <div className="notification-list_img">
                <img src={notification.image} alt={notification.user} />
              </div>

              <div className="notification-list_detail">
                <p><b>{notification.user}</b> {notification.action}</p>
                <p className="text-muted"><small>{notification.timestamp}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;