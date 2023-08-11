import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import MySQLConnector from './api/utils/connector';
import middleware from './api/middleware/middleware';
import wsMiddleware from './api/middleware/wsMiddleware';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://task6-79aae.web.app',
        methods: ['GET', 'POST'],
    },
});

const port = 3003;
app.use(cors());

MySQLConnector.init();
app.use(express.json());

io.on('connection', (socket) => {
    wsMiddleware(socket, io);
});

app.get('/ping', (_req, res) => {
    res.status(200).json({ message: 'pong' });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandling);

server.listen(port, () => {
    console.log(`Chat-server listening at http://localhost:${port}`);
});
