import axios from 'axios';

export default axios.create({
    baseURL: '130.243.216.165:8000/' /* eduroam */
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
    //TJENA TJENA TJENA JAG TESTAR ATT LÄGGA TILL LITE, VARFLR FUNKAR INTE GITHUB
});