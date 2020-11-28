import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api';
import '../sass/Login.scss';
import Helmet from 'react-helmet';

function initialState(){
    return {
        username: '',
        email: '',
        password: ''
    };
}

const Register = () => {
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const [values, setValues] = useState(initialState);

    const CreateUser = values => {
        api.post('/users/new', values).then((response) => {
            if(response.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: `Obrigado!`,
                    html: `Seu cadastro foi efetuado com sucesso!<br/> Você será redirecionado para a tela de login.`,
                    allowOutsideClick: false,
                    timer: 4000,
                    showConfirmButton: false
                }).then(() => {
                    history.push(`/welcome`);
                })
            }else {
                Swal.fire({
                    icon: `error`,
                    title: `Oops!`,
                    html: `Ocorreu um erro ao tentar efetuar seu cadastro.<br/> Por favor, tente novamente`
                })
            }
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
        <div id="register" className="custom-bg" style={{backgroundImage: `url('/bg-login.jpg')` }}>
            <Helmet title="Cadastro | Relatório de Horas" />
            <div className="d-flex h-100 justify-content-center align-items-center">
                <div className="card d-flex my-auto mx-auto">
                    <div className="card-body">
                        <div className="logo d-flex font-weight-bold">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                            </svg> Relatório de horas
                        </div>
                        <div className="form mt-4">
                            <p>Criar cadastro</p>
                            <form onSubmit={handleSubmit(CreateUser)}>
                                <div className="form-group">
                                    <label className="font-weight-bold text-uppercase">Username {errors.username && <small className="text-danger">{errors.username.message}</small>}</label>
                                    <input type="text" name="username" className="form-control" placeholer="Username" onChange={onChange} value={values.username} ref={register({ required: 'Campo obrigatório' })} />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold text-uppercase">Email {errors.email && <small className="text-danger">{errors.email.message}</small>}</label>
                                    <input type="text" name="email" className="form-control" placeholer="Email" onChange={onChange} value={values.email} ref={register({ required: 'Campo obrigatório' })} />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold text-uppercase">Senha {errors.password && <small className="text-danger">{errors.password.message}</small>}</label>
                                    <input type="password" name="password" className="form-control" onChange={onChange} value={values.password} ref={register({ required: 'Campo obrigatório' })}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-secondary text-white w-100">Cadastrar</button>
                                    <a href="/" className="mt-2 text-center d-block">Voltar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register