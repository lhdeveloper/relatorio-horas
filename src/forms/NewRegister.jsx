import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';

// importando plugins
import moment from 'moment';
// // import DatePicker, { registerLocale } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import pt from 'date-fns/locale/pt';

import Swal from 'sweetalert2';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

// axios api
import api from '../api';

export default function NewRegister(){
    // registerLocale('pt', pt);
    moment.locale('pt-br');

    //forms validation
    const { register, errors } = useForm();

    // pegando do localStorage os primeiros dados do user logado
    const getInfosUser = localStorage.getItem('infos-user');
    const infosUser = JSON.parse(getInfosUser);
    const currentID = infosUser.id;

    // setando campos;
    const [data, setData] = useState({
        data: moment().format('YYYY-MM-DD'),
        inicio: '',
        fim: '',
        saida: '',
        retorno: '',
        obs: '',
        user_id:'' 
    });

    // access token
    const accessToken = localStorage.getItem('app-token');

    const saveItem = (e) => {
        e.preventDefault();
        debugger
        var day = data.data.split('T')[0];
        data.inicio = data.inicio ? `${day} ${data.inicio}:00` : '';
        data.saida = data.saida ? `${day} ${data.saida}:00` : '';
        data.retorno = data.retorno ? `${day} ${data.retorno}:00` : '';
        data.fim = data.fim ? `${day} ${data.fim}:00` : '';
        data.user_id = currentID;
        
        api.post('/horas', data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(() => {
            return Swal.fire({
                icon:`success`,
                title: `Nice!`,
                text: `Registro criado com sucesso.`,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2000
            }).then(() =>{
                return window.location.href = '/'
            })
        }).catch((error) => {
            return Swal.fire({
                icon:`error`,
                title: `oops!`,
                text: `Ocorreu um erro ao tentar salvar. Motivo: ${error}`
            })
        })
    } 

    // update no data conforme os campos são modificados
    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]:e.target.value
        })
    }

    return (
        <>
            <Helmet title="Novo Registro | Relatório de Horas" />
            <Header></Header>
            <main>
                <div className="container">
                    <h1>Registar Hora</h1>
                    <section id="custom-form">
                        <form onSubmit={saveItem}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Data <span className="text-danger">*</span></label>
                                            <input type="date" name="data" value={data.data} onChange={handleChange} className="form-control" ref={register({ required: true })} />
                                            {errors.data && <p className="text-danger mt-2">{errors.data.message}</p>}
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Entrada</label>
                                        <input type="time" name="inicio" value={data.inicio} onChange={handleChange} ref={register({ required: false })} 
                                                className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida Almoço</label>
                                        <input type="time" name="saida" value={data.saida} onChange={handleChange} ref={register({ required: false })} 
                                                className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Retorno Almoço</label>
                                        <input type="time" name="retorno" value={data.retorno} onChange={handleChange} ref={register({ required: false })} 
                                                className="form-control"  />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida </label>
                                        <input type="time" name="fim" value={data.fim} onChange={handleChange} ref={register({ required: false })} 
                                                className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-uppercase font-weight-bold">Obs:</label>
                                <input type="text" name="obs" className="form-control" value={data.obs} onChange={handleChange} ref={register({ required: false })}  />
                            </div>
                            <div className="form-group text-center mt-4 d-none">
                                <h3>Total de horas no dia:</h3>
                                <p className="font-weight-bold"></p>
                            </div>
                            <div className="form-group justify-content-between">
                                <button type="submit" title="Cadastrar" className="btn btn-success mr-2 text-white">Cadastrar</button>
                                <Link to="/" title="Cancelar" className="btn btn-danger text-white">Cancelar</Link>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}