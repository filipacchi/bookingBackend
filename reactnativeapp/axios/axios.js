import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.68.110:8000/'
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
});