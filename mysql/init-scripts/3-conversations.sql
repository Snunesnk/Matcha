CREATE TABLE conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL, -- Stores the match_id of the match that this conversation is about
    last_message_id INT, -- Stores the last message sent in this conversation
    foreign key (match_id) references matches(id) on delete cascade
);