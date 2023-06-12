import { io } from 'socket.io-client';

const SOCKET_URI = 'http://172.16.0.57:2000';

export class SocketClient {
  private static instance: SocketClient;
  socket: ReturnType<typeof io> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    this.connect();
  }

  connect() {
    if (this.socket?.connected) {
      return;
    }
    console.log('Connecting to server');

    this.socket = io(SOCKET_URI);

    // Event listeners
    this.socket?.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket?.on('message', data => {
      console.log('Received message:', data);
    });

    this.socket?.on('disconnect', () => {
      console.log('disconnect');
    });

    // Cleanup
    return () => {
      this.socket?.disconnect();
    };
  }

  get checkConnection() {
    return this.socket?.connected;
  }

  send(data: SocketData) {
    try {
      if (__DEV__ && this.checkConnection) {
        const extendData: ExtendSocketData = {
          ...data,
          sendAt: new Date().toISOString(),
        };
        this.socket?.emit('tims', extendData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }

    return SocketClient.instance;
  }
}

export class TimsSocket {
  constructor() {
    this.client = SocketClient.getInstance();
  }

  client!: SocketClient;
  listeners: any[] = [];

  onChannel(channel: string, callback: (data: ExtendSocketData) => void) {
    const l = (_data: ExtendSocketData) => {
      if (_data?.channel === channel) {
        callback(_data);
      }
    };

    this.listeners.push(l);
    this.client.socket?.on('tims', l);
  }

  clear() {
    this.listeners.forEach(l => {
      this.client.socket?.off('tims', l);
    });
    this.listeners = [];
  }

  static init() {
    const ins = new TimsSocket();
    return ins;
  }
}

export const socketClient = SocketClient.getInstance();
