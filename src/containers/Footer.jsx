import React from 'react';

function Footer(){
    return (
        <footer className="bg-dark text-white py-3 py-sm-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-12 copyright">
                        &copy; 2020 | Todos os direitos reservados.
                    </div>
                    <div className="col-sm-3 text-sm-right ml-sm-auto mt-3 mt-sm-0 dev">
                        Dev by <a href="https://lhdeveloper.me" rel="noreferrer" title="Dev by LHDEVELOPER" target="_blank" className="dev-by">
                            <span className="logo-rdp text-danger">&lt;LH/&gt;</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;