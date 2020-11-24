import axios from 'axios';

const api = axios.create({
    baseURL: 'http://lhdeveloper-me.umbler.net'
});

export default api;