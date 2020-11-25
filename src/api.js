import axios from 'axios';
import cors from 'cors';
const api = axios.create({
    baseURL: 'https://api-relatorio-horas-me.umbler.net/'
    // baseURL: 'http://localhost:3333'
});

api.use(cors());

api.interceptors.request.use(async (config) => {
    try {
        const token = localStorage.getItem('app-token');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }catch(err) {
        console.log(err)
    }
})

export default api;