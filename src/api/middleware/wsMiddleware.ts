import { Socket, Server } from 'socket.io';
import { addMessage, getMessages, getTags } from '../services';

const wsMiddleware = async (socket: Socket, io: Server) => {
    const messages = await getMessages();
    const tags = await getTags();

    socket.emit('recieve_stored_messages', messages);
    socket.emit('recive_stored_tags', tags);

    socket.on('send_message', async (data) => {
        await addMessage(data);

        const messages = await getMessages();
        const tags = await getTags();

        io.sockets.emit('recieve_message', messages);
        io.sockets.emit('recive_stored_tags', tags);
    });
};

export default wsMiddleware;
