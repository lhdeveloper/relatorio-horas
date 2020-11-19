import React from 'react';
import Helmet from 'react-helmet';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

// importando views
import ViewHoras from './ViewHoras';
import Status from './Status';

export default function DashBoard(){

    return (
        <>
            <Helmet title="Home | Relatório de Horas" />
            <Header></Header>
            <main>
                <div id="dashboard">
                    <div className="container">
                        <section id="status">
                            <Status />
                        </section>

                        <section className="view">
                            <ViewHoras />
                        </section>
                    </div>
                </div>  
            </main>
            <Footer></Footer>
        </>
    )
}