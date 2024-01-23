ALTER TABLE conversations
ADD FOREIGN KEY (last_message_id) REFERENCES messages(message_id) ON DELETE SET NULL;