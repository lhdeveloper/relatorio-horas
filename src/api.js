import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'https://relatorio-horas-api.lhdeveloper.me'
    // baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(async (response) => {
    try {
        const token = localStorage.getItem('app-token');

        if(token){
            response.headers.Authorization = `Bearer ${token}`;
        }
        return response;
    }catch(error) {
        if (error.response && error.response.status === 401) {
            if (window.location.pathname !== "/") {
                localStorage.clear();
                window.location.href = "/";          
            }
        }

        if (
            error.response && (error.response.status === 500 || error.response.status === 503)) {
                return Swal.fire({
                    icon: `error`,
                    title: `Erro :(`,
                    html: `Ocorreu um erro no servidor.</br> <small>Tente novamente.</small>`
                })
        }
      
        if (error.response && error.response.status === 400) {
            return Swal.fire({
                icon: `error`,
                title: `Erro :(`,
                html: `Ocorreu um erro na sua solicitação.`
            })
        }

        let msgError = {
            status: "",
            msg: "",
        };
      
        if (error.response) {
            msgError = {
              status: error.response.status,
              msg: error.response.data.error_description
                ? error.response.data.error_description
                : error.response.data.message,
            };
        }
      
        return Promise.reject(msgError);
    }
})

export default api;