import React from 'react';
import Helmet from 'react-helmet';

export default function NotFound() {
    return (
        <>
            <Helmet title="404 | Relatório de Horas" />
            <div className="custom-bg" style={{backgroundImage: `url('/bg-login.jpg')`}}>
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <div className="container">
                        <div className="text-center py-5">
                            <h1 className="display-1 text-red font-weight-bold text-white text-info d-block">404</h1>
                            <p className="d-block text-white display-4">Desculpe, mas a página que você tentou acessar sumiu!</p>
                            <a href="/" title="Voltar para a home" className="btn btn-sm bg-white text-secondary">Voltar para a home</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}