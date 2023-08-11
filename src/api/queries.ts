export const MessageQueries = {
    AddMessage: `
  INSERT INTO messages (text) VALUES (?);`,

    GetMessages: `
  SELECT messages.*, GROUP_CONCAT(tags.text) AS tags
    FROM messages
    LEFT JOIN messages_tags ON messages.id = messages_tags.message_id
    LEFT JOIN tags ON messages_tags.tag_id = tags.id
    GROUP BY messages.id;`,
};

export const TagsQueries = {
    AddTags: `
  INSERT INTO tags (text)
      VALUES (?)
      ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
    GetTags: `
    SELECT * FROM tags`,
};

export const MessagesTagsQueries = {
    AddRelations: `
    INSERT INTO messages_tags (message_id, tag_id) VALUES (?, ?)
    `,
};
