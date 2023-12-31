import "./Notifications.css"
import React from 'react';

function Notifications() {
  const likes = [
    { user: 'John Doe', action: 'a aimé votre profil', timestamp: 'Il y a 10 minutes', image: 'https://i.imgur.com/zYxDCQT.jpg' },
    { user: 'Richard Miles', action: 'a aimé votre profil', timestamp: 'Il y a 20 minutes', image: 'https://i.imgur.com/w4Mp4ny.jpg' },
  ];
  const matches = [
    { user: 'Sarah', action: 'a matché avec vous', timestamp: 'Il y a 30 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { user: 'Lisa', action: 'a matché avec vous', timestamp: 'Il y a 40 minutes', image: 'https://i.imgur.com/AbZqFnR.jpg' },
  ];
  const visits = [
    { user: 'Brian Cumin', action: 'a visité votre profil', timestamp: 'Il y a 50 minutes', image: 'https://i.imgur.com/ltXdE4K.jpg' },
    { user: 'Lance Bogrol', action: 'a visité votre profil', timestamp: 'Il y a 60 minutes', image: 'https://i.imgur.com/CtAQDCP.jpg' },
  ];

  return (
    <section className="section-50">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="notification-category">Likes</h2>
            {likes.map((notification, index) => (
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

          <div className="col-md-4">
            <h2 className="notification-category">Matches</h2>
            {matches.map((notification, index) => (
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

          <div className="col-md-4">
            <h2 className="notification-category">Visites</h2>
            {visits.map((notification, index) => (
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

      </div>
    </section>
  );
}

export default Notifications;