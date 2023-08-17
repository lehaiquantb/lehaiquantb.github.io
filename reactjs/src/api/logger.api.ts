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
      limit: 10,
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
