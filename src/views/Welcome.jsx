import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import api from '../api';
import Swal from 'sweetalert2';
import '../sass/Login.scss';

export default function Welcome(){
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    
    function initialState(){
        return {
            email: '',
            password: ''
        };
    }

    const [values, setValues] = useState(initialState);
    const [disableForm, setDisableForm] = useState(false);

    const LoginUser = values => {
        api.post('/login', values).then((resp) => {
            const { data } = resp
            if(data){
                if(data.status !== 200){
                    setDisableForm(true);
                }

                localStorage.setItem('app-token', data.token);
                    const token = localStorage.getItem('app-token');
                    api.get(`/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((res) => {
                        const dadosUser = JSON.stringify(res.data);
                        localStorage.setItem('infos-user', dadosUser);
                        localStorage.setItem('last-access', moment().format('YYYY-MM-DD HH:mm:ss'))
                        localStorage.setItem('expired-access', moment().add(10, 'hours').format('YYYY-MM-DD HH:mm:ss'));
                        history.push("/");
                    })
            }
        }).catch((err) => {
            Swal.fire({
                icon: `error`,
                title: `Oops!`,
                html: `Sentimos muito, ocorreu um erro interno no Servidor.<br/><small>tente novamente dentro de alguns instantes.</small>`,
                allowOutsideClick: false
            })
        })
    }

    function onChange(event){
        const {value, name} = event.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <>
            <div id="welcome" className="custom-bg" style={{backgroundImage: `url('/bg-login.jpg')`}}>
                <div className="d-flex align-items-center">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-sm-8 presentation">
                                <h1>Quer organizar seus registros de horas trabalhadas?</h1>
                                <h2>Conheça o Relatório de Horas!</h2>
                                <p>Efetue o cadastro gratúito, agora mesmo!</p>
                            </div>
                            <div className="col-sm-4 login-box">
                                <div className={`card d-flex my-auto mx-auto ${disableForm === true ? 'disabled' : ''}`}>
                                    <div className="card-body">
                                        <div className="logo d-flex font-weight-bold">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                                            </svg> Relatório de horas
                                        </div>
                                        <div className="form mt-4">
                                            <form onSubmit={handleSubmit(LoginUser)}>
                                                <div className="form-group">
                                                    <label className="font-weight-bold text-uppercase">Email {errors.user && <small className="text-danger">{errors.user.message}</small>}</label>
                                                    <input type="text" name="email" className="form-control" placeholer="Email" onChange={onChange} value={values.email} ref={register({ required: 'Campo obrigatório' })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="font-weight-bold text-uppercase">Senha {errors.password && <small className="text-danger">{errors.password.message}</small>}</label>
                                                    <input type="password" name="password" className="form-control" onChange={onChange} value={values.password} ref={register({ required: 'Campo obrigatório' })}/>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-secondary text-white w-100">Entrar</button>
                                                    <a href="/register" className="mt-2 text-center d-block">Criar Conta</a>
                                                    <a href="/recovery" className="mt-2 text-center d-block">Esqueci minha senha</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}