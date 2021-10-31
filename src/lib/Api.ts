import axios, { AxiosInstance } from 'axios'

export default class Api {
    api:AxiosInstance;

    constructor () {
      this.api = axios.create({ baseURL: 'https://boda-aa.herokuapp.com/', withCredentials: true })
    }
}
