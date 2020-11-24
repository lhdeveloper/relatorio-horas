import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import Swal from 'sweetalert2';
import ImageUploader from 'react-images-upload';
import { Image } from 'cloudinary-react';
import InputMask from 'react-input-mask';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

import api from '../api';

export default function EditProfile() {
    let history = useHistory();

    // pegando do localStorage os primeiros dados do user logado
    const getInfosUser = localStorage.getItem('infos-user');
    const infosUser = JSON.parse(getInfosUser);
    const currentID = infosUser.id;

    // user token
    const accessToken = localStorage.getItem('app-token');

    //CLOUDINARY INFOS
    const cloudinary_name = `dg7jnpdp7`;

    // setando estdos;
    const [data, setData] = useState({
        nome: '',
        sobrenome: '',
        idade:'',
        cidade: '',
        cargo: '',
        email: '',
        telefone: '',
        resumo: '',
        image: '',
        valor_hora: ''
    });

    const [userEmail, setUserEmail] = useState('');
    
    // carregando os dados do usuario logado
    useEffect(() => {
        api.get(`/users/view/${currentID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(response.status === 200){
                setData(response.data);
                setUserEmail(response.data.email)
                
            }
        }).catch((error) => {
            return Swal.fire({
                icon:`error`,
                title: `oops!`,
                text: `Ocorreu um erro ao carregar dados. Motivo: ${error}`
            })
        })
        
    }, [currentID, accessToken])

    // update no data conforme os campos são modificados
    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]:e.target.value
        })
    }

    const handleCkeditor = (event, editor) => {
        const resumo = editor.getData();
        data.resumo = resumo;
    }

    const [previewSource, setPreviewSource] = useState('');

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const onDrop = picture => {
        const file = picture[0];
        previewFile(file);
        fileUploadHandler(file);
    };

    const fileUploadHandler = (imageUploaded) => {
        const formData = new FormData();
        formData.append('file', imageUploaded);
        formData.append('upload_preset', 'zcbttm6s');

        api.post(`http://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, formData)
            .then((response) => {
                if(response.status === 200){
                    setData({
                        ...data,
                        image:response.data.url
                    })
                    // Swal.fire({
                    //     icon: `success`,
                    //     title: `Show!`,
                    //     text: `Upload de imagem concluído com sucesso.`,
                    //     showConfirmButton: false,
                    //     timer: 2000
                    // })
                }
        }).catch((err) => {
            Swal.fire({
                icon: `error`,
                title: `Puxa :(`,
                text: `Algo deu errado, tente novamente. Status: ${err}`
            })
        })
    }

    // enviando os dados atualizados para a API
    const updateProfile = (e) => {
        e.preventDefault();

        api.put(`/users/update/${currentID}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            // verificando se o email foi alterado (questões de segurança no login)
            if(response.data.email !== userEmail){
                // salvando o e-mail atual antes da mudança
                const currentEmail = userEmail;

                Swal.fire({
                    icon: `warning`,
                    title: `Atenção!`,
                    html: `Deseja mesmo alterar seu e-mail de cadastro?`,
                    allowOutsideClick: false,
                    showCancelButton: true
                }).then((response) => {
                    if(response.isConfirmed){
                        return Swal.fire({
                            icon:`success`,
                            title: `Updated!`,
                            text: `Dados atualizados com sucesso`,
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(() => {
                            history.push(`/perfil/${data.username}`);
                        })
                    }else {
                        debugger
                        e.target[4].value = currentEmail;
                    }
                })
            }else{
                return Swal.fire({
                    icon:`success`,
                    title: `Updated!`,
                    text: `Dados atualizados com sucesso`,
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    history.push(`/perfil/${data.username}`);
                })
            }
        }).catch((error) => {
            return Swal.fire({
                icon:`error`,
                title: `oops!`,
                text: `Ocorreu um erro ao salvar. Motivo: ${error}`
            })
        })
    }


    return (
        <>
            <Helmet title="Editar Perfil | Relatório de Horas" />
            <Header></Header>
            <main>
                <section id="user-profile">
                    <div className="container">
                        <form onSubmit={updateProfile} encType="multipart/form-data">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="picture mb-3 bg-light p-3">
                                                {previewSource && (
                                                    <picture>
                                                        <img src={previewSource} alt="" className="w-100" name="image" onChange={handleChange} />
                                                    </picture>
                                                )}
                                                {!previewSource && (
                                                    <Image cloudName={cloudinary_name} publicId={data.image} loading="lazy"className="img-fluid">
                                                    </Image>
                                                )}
                                                
                                                <ImageUploader
                                                    withIcon={false}
                                                    onChange={onDrop}
                                                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                                    maxFileSize={5242880}
                                                    name="image"
                                                    buttonText="Carregar Imagem"
                                                    label="Tamanho Máximo: 5MB"
                                                    fileSizeError="Arquivo muito grande"
                                                    fileTypeError="Tipo de arquivo não suportado"
                                                />  
                                            </div>
                                        </div>
                                        <div className="col-sm-9">
                                            <h2 className="mb-3">Editar Perfil</h2>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Nome</label>
                                                        <input type="text" 
                                                                name="nome" 
                                                                className="form-control" 
                                                                value={data.nome} 
                                                                onChange={handleChange} 
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Sobrenome</label>
                                                        <input type="text" 
                                                                name="sobrenome" 
                                                                className="form-control" 
                                                                value={data.sobrenome} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">E-mail</label>
                                                        <input type="text" 
                                                                name="email" 
                                                                className="form-control"
                                                                value={data.email} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Idade</label>
                                                        <input type="text" 
                                                                name="idade" 
                                                                className="form-control" 
                                                                value={data.idade} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Cidade</label>
                                                        <input type="text" 
                                                                name="cidade" 
                                                                className="form-control" 
                                                                value={data.cidade} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Celular</label>
                                                        <InputMask className="form-control" mask="(99) 99999-9999" value={data.telefone} onChange={handleChange} />
                                                        {/* <input type="text" 
                                                                name="telefone" 
                                                                className="form-control" 
                                                                value={data.telefone} 
                                                                onChange={handleChange}
                                                        /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Cargo</label>
                                                        <input type="text" 
                                                                name="cargo" 
                                                                className="form-control" 
                                                                value={data.cargo} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="d-block font-weight-bold">Valor Hora</label>
                                                        <input type="text" 
                                                                name="valor_hora" 
                                                                className="form-control" 
                                                                value={data.valor_hora} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="d-block font-weight-bold">Resumo</label>
                                                <CKEditor
                                                    editor={ ClassicEditor } 
                                                    onChange={handleCkeditor}
                                                    data={data.resumo}
                                                    className="form-control"
                                                />       
                                            </div>

                                            <div className="form-group justify-content-between">
                                                <button title="Salvar" className="btn btn-success mr-2 text-white">Salvar</button>
                                                <Link to={`/perfil/${data.username}`} title="Cancelar" className="btn btn-danger text-white">Cancelar</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}