import axios, { AxiosInstance } from 'axios'

export default class Api {
    api:AxiosInstance;

    local = 'http://localhost:3000'
    server = 'https://boda-aa.herokuapp.com/'
    constructor () {
      this.api = axios.create({ baseURL: this.server, withCredentials: true })
    }
}
