type SocketData = {
  channel: string;
  data: any;
};

type ExtendSocketData = {
  sendAt: string;
} & SocketData;
