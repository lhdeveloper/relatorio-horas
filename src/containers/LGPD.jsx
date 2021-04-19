import React from 'react';
import { useState } from 'react';

export default function LGPD(){

    const [termos, setTermos] = useState(false);

    const termosAceite = () => {
        localStorage.setItem(`aceite-termos`, 'ok');
        setTermos(true);
    }

    return (
        <>
        {!termos && (
            <div id="lgpd">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10">
                            <p className="m-0">Este site trabalha com cookies apenas para facilitar o acesso, não armazenamos seus dados pessoais em cache.</p>
                        </div>
                        <div className="col-sm-2 ml-auto">
                            <button type="button" className="btn btn-sm btn-primary" onClick={termosAceite}>Prosseguir</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}