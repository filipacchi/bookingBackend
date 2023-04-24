import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.214:8000' /* samma som backend, som i sin tur startar på samma ip som frontend */
    /*axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}*/
    //TJENA TJENA TJENA JAG TESTAR ATT LÄGGA TILL LITE, VARFLR FUNKAR INTE GITHUB
});