import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

// import Swal from 'sweetalert2';
import Helmet from 'react-helmet';
import moment from 'moment';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

import api from '../api';

export default function UserProfile() {
    
    let isMobile = false;
        
    window.onresize = function(event){
        if(event.currentTarget.innerWidth < 996){
            isMobile = true;
        }
    }

    const infosUser = localStorage.getItem('infos-user');
    const jsonUser = JSON.parse(infosUser);
    const userID = jsonUser.id;
    const username = jsonUser.username;

    const [currentUser, setCurrentUser] = useState({});
    const accessToken = localStorage.getItem('app-token');
    const [totalHoras, setTotalHoras] = useState(0);

    //CLOUDINARY INFOS
    const cloudinary_name = `dg7jnpdp7`;

    // carregando dados do user logado
    useEffect(() => {
        api.get(`/users/view/${username}/${userID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(response.status === 200) {
                setCurrentUser(response.data);
            }

        }).catch((error) => {
            console.log(error)
            
        })
    }, [username, accessToken, userID])

    // carregando relatorio de horas do user logado
    useEffect(() => {
        api.get(`/horas/user/${userID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            const totalHoras = response.data.map((item) => {
                return item.total
            })

            const sum = totalHoras.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration()); 
            const total = [Math.floor(sum.asHours()), sum.minutes()].join(':');
            setTotalHoras(total);
        })
    
    }, [userID, accessToken])

    return (
        <>
            <Helmet title="Perfil | Relatório de Horas" />
            <Header></Header>
            <main>
                <section id="user-profile">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    {!isMobile && (
                                        <div className="col-sm-3">
                                            <div className="picture">
                                                <picture className="w-100 mb-3">
                                                    <Image cloudName={cloudinary_name} publicId={currentUser.image} loading="lazy" className="mx-auto w-100"></Image>
                                                </picture>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar-event-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                                                    </svg> {currentUser.idade || 'sem informações.'}
                                                </li>
                                                <li className="list-group-item">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                                                    <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                                    </svg> {currentUser.cidade || 'sem informações.'}
                                                </li>
                                                <li className="list-group-item">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-phone-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg> {currentUser.telefone || 'sem informações.'}
                                                </li>
                                                <li className="list-group-item">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                    </svg> {currentUser.email || 'sem informações.'}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className="col-sm-9 infos">
                                        {isMobile && (
                                            <div className="picture">
                                                <picture className="w-100 mb-3">
                                                    {!currentUser.image && (
                                                        <div className="d-flex justify-content-center">
                                                            <div className="loading">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <img src={currentUser.image} alt="" className="w-100" />
                                                </picture>
                                            </div>
                                        )}
                                        <div className="d-flex name-edit">
                                                <h2 className="text-secondary">{currentUser.nome} {currentUser.sobrenome} {currentUser.username ? `(${currentUser.username})` : ''}</h2>
                                            <Link to={`/perfil/${currentUser.username}/edit`} className="btn btn-secondary ml-auto justify-content-between">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </Link>
                                        </div>
                                        <h4 className="text-dark">{currentUser.cargo}</h4>
                                        <div className="horas-registradas text-success font-weight-bold small">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-star-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                                <span>{totalHoras} horas registradas | <strong>Valor hora:</strong> R$:{currentUser.valor_hora}</span>
                                        </div>
                                        
                                        <hr/>
                                        <div className="resumo" dangerouslySetInnerHTML={{ __html: currentUser.resumo }}/>

                                        {isMobile && (
                                            <>
                                                <h4 class="bg-secondary text-white p-2">Dados de contato</h4>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar-event-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                                                        </svg> {currentUser.idade + ' anos' || 'sem informações.'}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                                                        <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                                        </svg> {currentUser.cidade || 'sem informações.'}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-phone-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                        </svg> {currentUser.telefone || 'sem informações.'}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope-fill text-secondary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                        </svg> {currentUser.email || 'sem informações.'}
                                                    </li>
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}