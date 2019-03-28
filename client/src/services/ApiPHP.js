/* eslint-disable */
import axios from 'axios';
import Config from "@/config/config";

export default () => {
    return axios.create({ 
        baseURL: 'http://' + Config.service.dataBase.URL
    })
}