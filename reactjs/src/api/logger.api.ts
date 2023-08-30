import axios, { AxiosInstance } from 'axios';

const { REACT_APP_LOGGER_BASE_URL } = process.env;

export class LoggerApi {
  constructor() {
    this.client = axios.create({ baseURL: REACT_APP_LOGGER_BASE_URL });
  }

  client: AxiosInstance = axios.create({ baseURL: REACT_APP_LOGGER_BASE_URL });

  async getCheckingList(
    params = {
      page: 1,
      limit: 1000,
      fromTime: '2023-08-29T01:00:06.110Z',
      toTime: '2023-08-29T03:00:06.110Z',
    },
  ) {
    try {
      const res = await this.client.get('/checking', {
        params,
      });
      return res;
    } catch (error) {
      console.log('Error getting', error);
      throw error;
    }
  }
}

export const loggerApi = new LoggerApi();
console.log(loggerApi.getCheckingList);

export const getCheckingList = async () => {
  return await loggerApi.getCheckingList();
};

export const getList = async (url: string) => {
  return await axios.get(url);
};
