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
                {matches.map((match, i) => (
                    <NewMatch
                        key={i}
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
                    match.online ? 'online' : 'offline'
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
            {conversations.map((conversation, i) => (
                <MessageSnippet
                    key={i}
                    conversation={conversation}
                    setActiveConversation={setActiveConversation}
                />
            ))}
        </div>
    </div>
)

export function formatTimeDifference(dateString) {
    if (!dateString) return 'a while ago'

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

const MessageSnippet = ({ conversation, setActiveConversation }) => {
    const date = formatTimeDifference(conversation.last_message_timestamp)
    return (
        <div
            className={`message ${conversation.read ? '' : 'unread'}`}
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
                        conversation.online ? 'online' : 'offline'
                    }`}
                ></div>
            </div>
            <div className="message-info">
                <div className="message-info-header">
                    <div className="conv-name">{conversation.name}</div>
                    <time>{date}</time>
                </div>
                <p className="message-snippet">
                    {conversation.last_message_content}
                </p>

                {conversation.read ? null : (
                    <div className="new-message-icon"></div>
                )}
            </div>
        </div>
    )
}

export default MessagesLeftPane
