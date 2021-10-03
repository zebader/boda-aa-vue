import axios, { AxiosInstance } from 'axios'

export default class Api {
    api:AxiosInstance;

    constructor () {
      this.api = axios.create({ baseURL: 'http://localhost:3000/', withCredentials: true })
    }
}
