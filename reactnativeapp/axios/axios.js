import axios from 'axios';

export default axios.create({
    baseURL: 'http://172.20.10.2:8000/'
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
});