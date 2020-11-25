import React from 'react';

export default function Header() {

    // pegando do localStorage os primeiros dados do user logado
    const getInfosUser = localStorage.getItem('infos-user');
    const infosUser = JSON.parse(getInfosUser);

    return (
        <header className="bg-secondary p-2 p-sm-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <a className="navbar-brand border-right pr-4" href="/">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    </svg> Relatório de Horas
                </a>
                <button className="d-none navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav text-uppercase">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">DASHBOARD</a>
                        </li>
                        <li className="nav-item dropdown d-none">
                            <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Registro</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a href="/horas/new" title="" className="dropdown-item">Novo registro</a>
                                <a href="http://localhost/phpmyadmin" target="_blank" rel="noreferrer" title="" className="dropdown-item">Acessar Banco</a>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="dropdown justify-content-end mx-auto  mt-2 mt-sm-0 ml-sm-auto">
                    <button className="btn btn-transparent text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>  Olá, {infosUser.name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a href={`/perfil/${infosUser.username}`} className="dropdown-item"> 
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg> Meu perfil
                        </a>
                        <a className="dropdown-item" href="/logout"> 
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-power" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"/>
                            <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z"/>
                        </svg> Sair
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}