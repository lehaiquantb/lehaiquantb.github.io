type SocketData = {
  channel: string;
  data: any;
};

type ExtendSocketData = {
  sendAt: string;
} & SocketData;

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SOCKET_URI: string;
    REACT_APP_LOGGER_BASE_URL: string;
  }
}
