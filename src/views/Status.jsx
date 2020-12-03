import React, { useEffect, useState } from 'react';
import api from '../api';
import moment from 'moment';
import ContentLoader from "react-content-loader";

export default function Status(){
        const infosUser = localStorage.getItem('infos-user');
        const jsonUser = JSON.parse(infosUser);
        const userID = jsonUser.id;
        const token = localStorage.getItem('app-token');
        const [registros, setRegistros] = useState('');
        const [totalHoras, setTotalHoras] = useState(0);
        const [totalMes, setTotalMes] = useState();

        useEffect(() => {
            api.get(`/horas/user/${userID}`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }).then((res) => {
                setRegistros(res.data);
                const totalHoras = res.data.map((item) => {
                    return moment(item.total).format(`HH:mm:ss`);
                })

                const sum = totalHoras.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration()); 
                const total = [Math.floor(sum.asHours()), sum.minutes()].join(':');

                setTotalHoras(total);
                setTotalMes(`00:00:00`);
                
            }).catch((err) => {
                console.log(err)
            })
        }, [userID, token])
       

    return (
        <div className="row status">
            <div className="col-lg-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        {!registros && (
                                <ContentLoader 
                                speed={2}
                                width={300}
                                height={63.5}
                                viewBox="0 0 300 40"
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
                        )}
                        {registros && (
                            <div className="media flex-grow-1">
                            <div className="media-body">
                                <h6 className="mb-3">Total de Registros</h6>
                                <div className="fs-4 mb-1 text-secondary">{registros.length}</div>
                            </div>
                            <div className="d-inline-block ml-3">
                                <div className="start text-center">
                                    <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-list-check text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        {!totalHoras && (
                            <ContentLoader 
                                speed={2}
                                width={300}
                                height={63.5}
                                viewBox="0 0 300 40"
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
                        )}
                        {totalHoras !== 0 && (
                            <div className="media flex-grow-1">
                                <div className="media-body">
                                    <h6 className="mb-3">Horas registradas até o momento</h6>
                                    <div className="fs-4 mb-1 text-info">{totalHoras}</div>
                                </div>
                                <div className="d-inline-block ml-3">
                                    <div className="start text-center">
                                        <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-hourglass-split text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        {!totalMes && (
                            <ContentLoader 
                            speed={2}
                            width={300}
                            height={63.5}
                            viewBox="0 0 300 40"
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
                        )}
                        {totalMes && (
                            <div className="media flex-grow-1">
                                <div className="media-body">
                                    <h6 className="mb-3">Total de Horas mês</h6>
                                    <div className="fs-4 mb-1 text-success">00:00</div>
                                </div>
                                <div className="d-inline-block ml-3">
                                    <div className="start text-center">
                                        <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-clock-fill text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}