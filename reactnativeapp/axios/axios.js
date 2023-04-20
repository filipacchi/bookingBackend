import axios from 'axios';

export default axios.create({
    baseURL: '130.243.216.165:8000/' /* eduroam */
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
});