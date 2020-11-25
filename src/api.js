import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-relatorio-horas-me.umbler.net/'
});

export default api;