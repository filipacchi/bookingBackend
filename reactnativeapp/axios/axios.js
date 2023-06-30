import axios from 'axios';

export default axios.create({
    baseURL: 'https://bookease.se'
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
    //TJENA TJENA TJENA JAG TESTAR ATT LÄGGA TILL LITE, VARFLR FUNKAR INTE GITHUB
});
