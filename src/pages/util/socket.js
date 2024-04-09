import { io } from 'socket.io-client';
import { server } from './server';

export const socket = io(server);