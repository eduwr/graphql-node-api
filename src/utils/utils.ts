import { Server } from 'http';
import { AddressInfo } from 'net';

export const normalizePort = (val: number | string): number | string | boolean => {
    const port: number = typeof val === 'string' ? parseInt(val) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
};

export const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        const { port } = server.address() as AddressInfo;
        if (error.syscall !== 'listen') throw error;
        const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
};

export const onListening = (server: Server) => {
    return (): void => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening at ${bind}...`);
    };
};
