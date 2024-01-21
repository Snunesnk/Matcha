import React from 'react'
import './MessagesLeftPane.css'

const MessagesLeftPane = ({
    newMatches,
    conversations,
    setActiveConversation,
}) => {
    return (
        <div className="chat-sidebar">
            <NewMatchesSection
                matches={newMatches}
                setActiveConversation={setActiveConversation}
            />
            <MessagesSection
                conversations={conversations}
                setActiveConversation={setActiveConversation}
            />
        </div>
    )
}

const NewMatchesSection = ({ matches, setActiveConversation }) => (
    <div className="new-matches-section">
        <h4>New matches</h4>
        <div className="new-matches">
            <div className="new-matches-container">
                {matches.map((match) => (
                    <NewMatch
                        key={match.id}
                        match={match}
                        setActiveConversation={setActiveConversation}
                    />
                ))}
            </div>
        </div>
    </div>
)

const NewMatch = ({ match, setActiveConversation }) => (
    <div
        className="new-match"
        onClick={() => {
            setActiveConversation(match)
        }}
    >
        <div className="new-match-img-container">
            <img
                src={
                    match.imgA.startsWith('http')
                        ? match.imgA
                        : 'http://localhost:8080/api' + match.imgA
                }
                alt={`${match.name}'s avatar`}
                className="avatar"
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

const MessagesSection = ({ conversations, setActiveConversation }) => (
    <div className="messages">
        <h4>Messages</h4>
        <div className="messages-list">
            {conversations.map((conversation) => (
                <MessageSnippet
                    key={conversation.id}
                    conversation={conversation}
                    setActiveConversation={setActiveConversation}
                />
            ))}
        </div>
    </div>
)

const MessageSnippet = ({ conversation, setActiveConversation }) => (
    <div
        className={`message ${conversation.unread ? 'unread' : ''}`}
        onClick={() => {
            setActiveConversation(conversation)
        }}
    >
        <div className="message-img-container">
            <img
                src={
                    conversation.imgA.startsWith('http')
                        ? conversation.imgA
                        : 'http://localhost:8080/api' + conversation.imgA
                }
                alt="user avatar"
                className="avatar"
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
