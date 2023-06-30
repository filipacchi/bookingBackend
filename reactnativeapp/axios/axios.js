import axios from 'axios';

export default axios.create({
   // baseURL: 'https://bookease.se'
   // baseURL: "http://192.168.68.114:8000/" /*  */
   baseURL: "http://192.168.1.214:8000/" /* Kalle */
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
    //TJENA TJENA TJENA JAG TESTAR ATT LÄGGA TILL LITE, VARFLR FUNKAR INTE GITHUB
});
