import axios from 'axios';

export default axios.create({
    baseURL: 'http://172.20.10.2:9000/'
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
});