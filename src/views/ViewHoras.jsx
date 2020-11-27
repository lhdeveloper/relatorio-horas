import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ContentLoader from "react-content-loader"

import Swal from 'sweetalert2';
import api from '../api';

export default function RelatorioGeral(){
    let [relatorios, setRelatorios] = useState([]);
    moment.locale('pt-br');
    
    // access token
    const accessToken = localStorage.getItem('app-token');
    const infosUser = localStorage.getItem('infos-user');
    const jsonUser = JSON.parse(infosUser);
    const userID = jsonUser.id;

    var isMobile = window.innerWidth < 996
    
    useEffect(() => {
        api.get(`/horas/user/${userID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            setRelatorios(response.data);
        }).catch((err) => {
            Swal.fire({
                icon: `error`,
                title: `Ah não!`,
                html: `Ocorreu um erro ao carregar o relatório.<br/> <strong>Erro: ${err}</strong>`
            })
        })
    }, [accessToken, userID]);

    const deleteItem = (item) =>{
        return Swal.fire({
            icon:`warning`,
            title: `Atenção:`,
            text: `Deseja mesmo excluir este item #${item.id}?`,
            allowOutsideClick: false,
            showCancelButton: true,
        }).then((result) => {
            if(result.isConfirmed){
                const accessToken = localStorage.getItem('app-token');

                return api.delete(`/horas/${item.id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }).then((res) => {
                    debugger
                    Swal.fire({
                        icon: `success`,
                        title: `Beleza!`,
                        html: `Item #${item.id} deletado com sucesso.`,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        return window.location.reload();
                    })
                }).catch((err) => {
                    Swal.fire({
                        icon: `error`,
                        title: `Ah não!`,
                        text: `Ocorreu um erro ao salvar.<span>${err}</span>`
                    })
                })
            }
        })
    }

    return (
        <>
            <div className="d-flex title-button mb-3">
                <h2><span className="text-secondary">View de horas</span></h2>
                <a href="/horas/new" title="Registrar horas" className="btn btn-danger text-white ml-auto">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bookmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.5 4.5a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                    </svg> Registrar horas
                </a>
            </div>
            
            {!isMobile && (
                <div className="card">
                    <div className="card-body">
                        {!relatorios.length && (
                            <>
                                <ContentLoader 
                                    speed={3}
                                    width={600}
                                    height={52}
                                    viewBox="0 0 600 52"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                    <circle cx="20" cy="20" r="20" />
                                </ContentLoader>
                                <ContentLoader 
                                    speed={3}
                                    width={600}
                                    height={52}
                                    viewBox="0 0 600 52"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                    <circle cx="20" cy="20" r="20" />
                                </ContentLoader>
                                <ContentLoader 
                                    speed={3}
                                    width={600}
                                    height={52}
                                    viewBox="0 0 600 52"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                    <circle cx="20" cy="20" r="20" />
                                </ContentLoader>
                                <ContentLoader 
                                    speed={3}
                                    width={600}
                                    height={52}
                                    viewBox="0 0 600 52"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                    <circle cx="20" cy="20" r="20" />
                                </ContentLoader>
                            </>
                            
                        )}
                        {relatorios.length > 0 && (
                            <table className="table table-striped m-0">
                                <thead className="thead-light text-uppercase">
                                    <tr>
                                        <th scope="col">Data</th>
                                        <th scope="col">Entrada</th>
                                        <th scope="col" className="d-none d-md-table-cell">Saida Almoço</th>
                                        <th scope="col" className="d-none d-md-table-cell">Retorno Almoço</th>
                                        <th scope="col">Saida</th>
                                        <th scope="col">Total Dia</th>
                                        <th scope="col" className="d-none d-md-table-cell">Obs</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relatorios.map(item => (
                                        <tr key={item.id}>
                                            <td>{ moment(item.data).format('DD/MM') }</td>
                                            <td>{ item.inicio ? moment(item.inicio).format('HH:mm') : '' }</td>
                                            <td className="d-none d-md-table-cell">{ item.saida ? moment(item.saida).format('HH:mm') : '' }</td>
                                            <td className="d-none d-md-table-cell">{ item.retorno ? moment(item.retorno).format('HH:mm') : '' }</td>
                                            <td>{ item.fim ? moment(item.fim).format('HH:mm') : '' }</td>
                                            <td>{ item.total }</td>
                                            <td className="d-none d-md-table-cell">{ item.obs }</td>
                                            <td align="center" className="actions">
                                                <a href={`/horas/edit/${item.id}`} title="Editar" className="mr-3 text-secondary">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                </a>
                                                <Link to="/" onClick={() => deleteItem(item)} title="Excluir" className="text-red">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* se for mobile */}

            {isMobile && (
                <div className="mobile">
                    {!relatorios.length && (
                        <>
                            <ContentLoader 
                                speed={3}
                                width={600}
                                height={52}
                                viewBox="0 0 600 52"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                <circle cx="20" cy="20" r="20" />
                            </ContentLoader>
                            <ContentLoader 
                                speed={3}
                                width={600}
                                height={52}
                                viewBox="0 0 600 52"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                <circle cx="20" cy="20" r="20" />
                            </ContentLoader>
                            <ContentLoader 
                                speed={3}
                                width={600}
                                height={52}
                                viewBox="0 0 600 52"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                <circle cx="20" cy="20" r="20" />
                            </ContentLoader>
                            <ContentLoader 
                                speed={3}
                                width={600}
                                height={52}
                                viewBox="0 0 600 52"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                                <circle cx="20" cy="20" r="20" />
                            </ContentLoader>
                        </>
                        
                    )}

                    {relatorios.length > 0 && (
                        <>
                            {relatorios.map(item => (
                                <div className="card mb-3" key={item.id}>
                                    <div className="card-body">
                                        <div className="head">
                                            <div className="row">
                                                <div className="col">
                                                    <h4 className="card-title text-red">{moment(item.data).format('DD/MM')}</h4>
                                                </div>
                                                <div className="col text-right buttons-actions">
                                                    <a href={`/horas/edit/${item.id}`} title="Editar" className="mr-3 text-secondary">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </a>
                                                    <Link to="/" onClick={() => deleteItem(item)} title="Excluir" className="text-red">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <small className="font-weight-bold">Entrada</small>
                                                <div>{item.inicio ? moment(item.inicio).format('HH:mm') : ''}</div>
                                            </div>
                                            <div className="col">
                                                <small className="font-weight-bold">Saida</small>
                                                <div>{item.saida ? moment(item.saida).format('HH:mm') : ''}</div>
                                            </div>
                                            <div className="col">
                                                <small className="font-weight-bold">Retorno</small>
                                                <div>{item.retorno ? moment(item.retorno).format('HH:mm') : ''}</div>
                                            </div>
                                            <div className="col">
                                                <small className="font-weight-bold">Saida</small>
                                                <div>{item.saida ? moment(item.saida).format('HH:mm') : ''}</div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="bg-secondary text-white p-1">
                                                    <small className="font-weight-bold">Total de horas no Dia: {item.total}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </>
    )
}