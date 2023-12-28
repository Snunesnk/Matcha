import React from 'react'
import './MessagesLeftPane.css'

const MessagesLeftPane = ({ newMatches, conversations }) => {
    return (
        <div className="chat-sidebar">
            <NewMatchesSection matches={newMatches} />
            <MessagesSection conversations={conversations} />
        </div>
    )
}

const NewMatchesSection = ({ matches }) => (
    <div className="new-matches-section">
        <h4>New matches</h4>
        <div className="new-matches">
            <div className="new-matches-container">
                {matches.map((match) => (
                    <NewMatch key={match.id} match={match} />
                ))}
            </div>
        </div>
    </div>
)

const NewMatch = ({ match }) => (
    <div className="new-match">
        <div className="new-match-img-container">
            <img
                src={match.photo}
                alt={`${match.name}'s avatar`}
                className={`avatar ${match.isOnline ? 'online' : 'offline'}`}
            />
            <div
                className={`status-indicator ${
                    match.isOnline ? 'online' : 'offline'
                }`}
            ></div>
        </div>
        <p className="name">{match.name}</p>
    </div>
)

const MessagesSection = ({ conversations }) => (
    <div className="messages">
        <h4>Messages</h4>
        <div className="messages-list">
            {conversations.map((conversation) => (
                <MessageSnippet
                    key={conversation.id}
                    conversation={conversation}
                />
            ))}
        </div>
    </div>
)

const MessageSnippet = ({ conversation }) => (
    <div className={`message ${conversation.unread ? 'unread' : ''}`}>
        <div className="message-img-container">
            <img
                src={conversation.photo}
                alt="user avatar"
                className={`avatar ${
                    conversation.isOnline ? 'online' : 'offline'
                }`}
            />
            <div
                className={`status-indicator ${
                    conversation.isOnline ? 'online' : 'offline'
                }`}
            ></div>
        </div>
        <div className="message-info">
            <div className="message-info-header">
                <div className="conv-name">{conversation.name}</div>
                <time>{conversation.lastMessageDate}</time>
            </div>
            <p className="message-snippet">{conversation.lastMessage}</p>
        </div>
    </div>
)
export default MessagesLeftPane
