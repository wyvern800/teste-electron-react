import axios, { AxiosInstance } from 'axios';

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://pokeapi.co/api/v2',
      timeout: 10000,
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiService = ApiService.getInstance();
