import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
//import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import moment from 'moment';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

import Swal from 'sweetalert2';
import api from '../api';

export default function EditRegister(props){

    // current id item
    const currentID = props.match.params.id;
    
    // pegando do localStorage os primeiros dados do user logado
    const getInfosUser = localStorage.getItem('infos-user');
    const infosUser = JSON.parse(getInfosUser);
    const currentIDUser = infosUser.id;

    //forms validation
    //const { register, handleSubmit, errors } = useForm();
    
    // setando campos;
    const [data, setData] = useState({
        data: '',
        inicio: '',
        fim: '',
        saida: '',
        retorno: '',
        obs: '',
        user_id:'',
        saida2: '',
        saida3: '',
        saida4: '',
        retorno2: '',
        retorno3: '',
        retorno4: ''
    });

    // access token
    const accessToken = localStorage.getItem('app-token');
    
    // carregando os dados da API
    useEffect(() => {
        api.get(`/horas/${currentID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            // modificando os campos de hora pra serem exibidos
            let modifyObj = response.data;
            modifyObj.data = `${moment(modifyObj.data).format('YYYY-MM-DD')}`
            modifyObj.inicio = `${modifyObj.inicio ? moment(modifyObj.inicio).format(`HH:mm`) : ''}`;
            modifyObj.saida = `${modifyObj.saida ? moment(modifyObj.saida).format(`HH:mm`) : ''}`;
            modifyObj.retorno = `${modifyObj.retorno ? moment(modifyObj.retorno).format(`HH:mm`) : ''}`;
            modifyObj.fim = `${modifyObj.fim ? moment(modifyObj.fim).format(`HH:mm`) : ''}`;
            
            setData(modifyObj)

        }).catch((error) => {
            return Swal.fire({
                icon:`error`,
                title: `oops!`,
                text: `Ocorreu um erro ao carregar dados. Motivo: ${error}`
            })
        })
        
    }, [accessToken, currentID])

    // update no data conforme os campos são modificados
    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]:e.target.value
        })
    }

    // atualizando os dados
    const updateItem = (e) => {
        e.preventDefault();

        var day = data.data.split('T')[0];

        data.inicio = `${day} ${data.inicio}:00`;

        if(data.saida){
            data.saida = `${day} ${data.saida}:00`;
        }else {
            data.saida = ''
        }

        if(data.retorno){
            data.retorno = `${day} ${data.retorno}:00`;
        }else {
            data.retorno = '';
        }

        if(data.fim){
            data.fim = `${day} ${data.fim}:00`;
        }else {
            data.fim = '';
        }

        if(data.saida2){
            data.saida2 = `${day} ${data.saida2}:00`;
        }else {
            data.saida2 = '';
        }

        if(data.saida3){
            data.saida3 = `${day} ${data.saida3}:00`;
        }else {
            data.saida3 = '';
        }
        
        if(data.saida4){
            data.saida4 = `${day} ${data.saida4}:00`;
        }else {
            data.saida4 = '';
        }

        if(data.retorno2){
            data.retorno2 = `${day} ${data.retorno2}:00`;
        }else {
            data.retorno2 = '';
        }

        if(data.retorno3){
            data.retorno3 = `${day} ${data.retorno3}:00`;
        }else {
            data.retorno3 = '';
        }

        if(data.retorno4){
            data.retorno4 = `${day} ${data.retorno4}:00`;
        }else {
            data.retorno4 = '';
        }

        data.user_id = currentIDUser;
        
        api.put(`/horas/${currentID}/${currentIDUser}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            return Swal.fire({
                icon:`success`,
                title: `Updated!`,
                text: `Dados atualizados com sucesso`,
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.href = '/'
            })
        }).catch((error) => {
            return Swal.fire({
                icon:`error`,
                title: `oops!`,
                text: `Erro ao carregar item: ${error}`
            })
        })
    } 
    
    return (
        <>
            <Helmet title="Editar Registro | Relatório de Horas" />
            <Header></Header>
            <main>
                <div className="container">
                    <h1>Editar Registro: {moment(data.data).format('DD/MM/YY')}</h1>
                    <section id="custom-form">
                        <form onSubmit={updateItem}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-sm-auto">
                                        <div className="form-group">
                                            <label className="text-uppercase font-weight-bold">Data <span className="text-danger">*</span></label>
                                            <input type="date" name="data" value={data.data} onChange={handleChange}
                                                    className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Entrada</label>
                                        <InputMask mask="99:99" name="inicio" value={data.inicio} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida Almoço</label>
                                        <InputMask mask="99:99" name="saida" value={data.saida} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Retorno Almoço</label>
                                        <InputMask mask="99:99" name="retorno" value={data.retorno} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="col-12 col-sm-auto">
                                        <label className="text-uppercase font-weight-bold">Saida</label>
                                        <InputMask mask="99:99" name="fim" value={data.fim} onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group pt-3">
                                <h3 className="text-red">Editar saidas extras</h3>
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
                                <input type="text" name="obs" className="form-control" value={data.obs} onChange={handleChange}/>
                            </div>
                            <div className="form-group justify-content-between">
                                <button title="Cadastrar" className="btn btn-success mr-2 text-white">Alterar</button>
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