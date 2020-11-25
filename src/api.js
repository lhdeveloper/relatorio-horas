import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api-relatorio-horas-me.umbler.net/'
});

export default api;