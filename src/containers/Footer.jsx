import React from 'react';

function Footer(){
    return (
        <footer className="bg-dark text-white p-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        &copy; 2020 | Todos os direitos reservados.
                    </div>
                    <div className="ml-sm-auto">
                        Dev by <a href="https://lhdeveloper.me" rel="noreferrer" title="Dev by LHDEVELOPER" target="_blank" className="dev-by"><span className="logo-rdp text-danger">&lt;LH/&gt;</span></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;