import React from 'react';
import Helmet from 'react-helmet';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

export default function NotFound() {
    return (
        <>
            <Helmet title="404 | Relatório de Horas" />
            <Header></Header>
            <main>
                <div className="container">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <div className="text-center py-5">
                            <h1 className="display-4 text-info d-block">404</h1>
                            <p className="d-block">Desculpe, mas a página que você tentou acessar sumiu!</p>
                            <a href="/" title="Voltar para a home" className="btn btn-sm btn-secondary text-white">Voltar para a home</a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}