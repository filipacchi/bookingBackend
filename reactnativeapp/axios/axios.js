import axios from 'axios';

export default axios.create({
   /*  baseURL: 'https://bookease.se' */
   baseURL: "http://192.168.68.114:8000/"
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
    //TJENA TJENA TJENA JAG TESTAR ATT LÄGGA TILL LITE, VARFLR FUNKAR INTE GITHUB
});
