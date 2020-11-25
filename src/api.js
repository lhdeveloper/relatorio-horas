import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-relatorio-horas-me.umbler.net/'
});

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