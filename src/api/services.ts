import MySQLConnector from './utils/connector';
import { MessageQueries, MessagesTagsQueries, TagsQueries } from './queries';
import { InsertResult, MessageFromClient, MessageFromSQL } from './models';
import { format } from './utils/format';

export const getMessages = async () => {
    const result: MessageFromSQL[] = await MySQLConnector.execute(
        MessageQueries.GetMessages,
        []
    );

    const formatted = result.map((message) => {
        return {
            ...message,
            tags: format(message.tags),
        };
    });

    return formatted;
};

export const getTags = async () => {
    const result = await MySQLConnector.execute(TagsQueries.GetTags, []);

    return result;
};

export const addMessage = async (data: MessageFromClient) => {
    const result: InsertResult = await MySQLConnector.execute(
        MessageQueries.AddMessage,
        [data.text]
    );

    const messageId = result.insertId;

    const ids = [];

    for (const tag of data.tags) {
        const { insertId }: { insertId: number } = await MySQLConnector.execute(
            TagsQueries.AddTags,
            [tag]
        );

        ids.push(insertId);
    }

    for (const id of ids) {
        await MySQLConnector.execute(MessagesTagsQueries.AddRelations, [
            messageId,
            id,
        ]);
    }
};
