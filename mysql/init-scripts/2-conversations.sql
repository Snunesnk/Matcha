CREATE TABLE conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    user1 VARCHAR(50) NOT NULL,
    user2 VARCHAR(50) NOT NULL,
    last_message_id INT, -- Stores the last message sent in this conversation
    FOREIGN KEY (user1) REFERENCES user(login),
    FOREIGN KEY (user2) REFERENCES user(login),
    UNIQUE KEY user_pair_unique(user1, user2) -- Ensure uniqueness
);