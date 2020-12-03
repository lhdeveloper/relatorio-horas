import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

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
        user_id:'',
        saida2: '',
        retorno2: '',
        saida3: '',
        retorno3: '',
        saida4:'',
        retorno4:'',
    });

    // access token
    const accessToken = localStorage.getItem('app-token');

    // update no data conforme os campos são modificados
    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]:e.target.value
        })
    }

    const saveItem = (e) => {
        e.preventDefault();

        var today = data.data.split('T')[0];

        // verificando os valores dos campos antes de salvar;
        data.inicio = data.inicio ? moment(today).format(`YYYY-MM-DD ${data.inicio}:ss`) : '';
        data.saida = data.saida ? moment(today).format(`YYYY-MM-DD ${data.saida}:ss`) : '';
        data.retorno = data.retorno ? moment(today).format(`YYYY-MM-DD ${data.retorno}:ss`) : '';
        data.fim = data.fim ? moment(today).format(`YYYY-MM-DD ${data.fim}:ss`) : '';
        data.user_id = currentID;
        data.saida2 = data.saida2 ? moment(today).format(`YYYY-MM-DD ${data.saida2}:ss`) : '';
        data.retorno2 = data.retorno2 ? moment(today).format(`YYYY-MM-DD ${data.retorno2}:ss`) : '';
        data.saida3 = data.saida3 ? moment(today).format(`YYYY-MM-DD ${data.saida3}:ss`) : '';
        data.retorno3 = data.retorno3 ? moment(today).format(`YYYY-MM-DD ${data.retorno3}:ss`) : '';
        data.saida4 = data.saida4 ? moment(today).format(`YYYY-MM-DD ${data.saida4}:ss`): '';
        data.retorno4 = data.retorno4 ? moment(today).format(`YYYY-MM-DD ${data.retorno4}:ss`) : '';

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
                                        <label className="text-uppercase font-weight-bold">Início</label>
                                        <InputMask mask="99:99" onChange={handleChange} name="inicio" value={data.inicio} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida Almoço</label>
                                        <InputMask mask="99:99" onChange={handleChange} name="saida" value={data.saida} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Retorno Almoço</label>
                                        <InputMask mask="99:99" onChange={handleChange} name="retorno" value={data.retorno} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida </label>
                                        <InputMask mask="99:99" onChange={handleChange} name="fim" value={data.fim} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group pt-3">
                                <h3 className="text-red">Adicionar saidas extras</h3>
                                <div className="saidas-plus">
                                    <div className="row">
                                        <div className="col" rel="1">
                                            <label className="text-uppercase font-weight-bold">Saida 2</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="saida2" value={data.saida2} className="form-control" />
                                        </div>
                                        <div className="col" rel="1">
                                            <label className="text-uppercase font-weight-bold">Retorno 2</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="retorno2" value={data.retorno2} className="form-control" />
                                        </div>
                                        <div className="col" rel="2">
                                            <label className="text-uppercase font-weight-bold">Saida 3</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="saida3" value={data.saida3} className="form-control" />
                                        </div>
                                        <div className="col" rel="2">
                                            <label className="text-uppercase font-weight-bold">Retorno 3</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="retorno3" value={data.retorno3} className="form-control" />
                                        </div>
                                        <div className="col" rel="3">
                                            <label className="text-uppercase font-weight-bold">Saida 4</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="saida4" value={data.saida4} className="form-control" />
                                        </div>
                                        <div className="col" rel="3">
                                            <label className="text-uppercase font-weight-bold">Retorno 4</label>
                                            <InputMask mask="99:99" onChange={handleChange} name="retorno4" value={data.retorno4} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-uppercase font-weight-bold">Obs:</label>
                                <input type="text" name="obs" className="form-control" value={data.obs} onChange={handleChange} ref={register({ required: false })}  />
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