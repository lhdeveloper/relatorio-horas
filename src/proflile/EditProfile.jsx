import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import Swal from 'sweetalert2';
import ImageUploader from 'react-images-upload';
import { Image, Transformation } from 'cloudinary-react';
import InputMask from 'react-input-mask';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

// importando containers
import Header from '../containers/Header';
import Footer from '../containers/Footer';

import api from '../api';

export default function EditProfile() {
    let history = useHistory();

    // pegando do localStorage os primeiros dados do user logado
    const getInfosUser = localStorage.getItem('infos-user');
    const infosUser = JSON.parse(getInfosUser);
    const currentUserName = infosUser.username;
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
        api.get(`/users/view/${currentUserName}/${currentID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
        
    }, [currentID, accessToken, currentUserName])

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

    const onDrop = picture => {
        const file = picture[0];
        previewFile(file);
        fileUploadHandler(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    }

    const fileUploadHandler = (imageUploaded) => {
        const formData = new FormData();
        formData.append('file', imageUploaded);
        formData.append('upload_preset', 'zcbttm6s');

        axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, formData)
            .then((response) => {
                if(response.status === 200){
                    setData({
                        ...data,
                        image:response.data.secure_url
                    })
                    setPreviewSource(response.data.secure_url);
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
                                                {previewSource ?
                                                    <picture>
                                                        <img src={previewSource} width="200px" height="200px" />
                                                    </picture>
                                                :   <Image cloudName={cloudinary_name} publicId={data.image} loading="lazy" className="mx-auto">
                                                        <Transformation height="200" width="200" crop="fill" />
                                                    </Image>
                                                }
                                                
                                                <ImageUploader
                                                    withIcon={false}
                                                    onChange={onDrop}
                                                    imgExtension={[".jpg", "jpeg", ".png"]}
                                                    maxFileSize={5242880}
                                                    name="image"
                                                    buttonText="Carregar Imagem"
                                                    label="Tamanho Máximo: 5mb (.jpg, .jpeg e .png)"
                                                    fileSizeError="Arquivo muito grande"
                                                    fileTypeError="Tipo de arquivo não suportado"
                                                />  
                                            </div>
                                        </div>
                                        <div className="col-sm-9">
                                            <h2 className="mb-3">Editar Perfil</h2>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Nome</label>
                                                        <input type="text" 
                                                                name="nome" 
                                                                className="form-control" 
                                                                value={data.nome} 
                                                                onChange={handleChange} 
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Sobrenome</label>
                                                        <input type="text" 
                                                                name="sobrenome" 
                                                                className="form-control" 
                                                                value={data.sobrenome} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
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
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Idade</label>
                                                        <input type="text" 
                                                                name="idade" 
                                                                className="form-control" 
                                                                value={data.idade} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Cidade</label>
                                                        <input type="text" 
                                                                name="cidade" 
                                                                className="form-control" 
                                                                value={data.cidade} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Celular</label>
                                                        <InputMask className="form-control" name="telefone" mask="(99) 99999-9999" value={data.telefone} onChange={handleChange} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-12 col-sm-4">
                                                        <label className="d-block font-weight-bold">Cargo</label>
                                                        <input type="text" 
                                                                name="cargo" 
                                                                className="form-control" 
                                                                value={data.cargo} 
                                                                onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
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
                                                    data={data.resumo ? data.resumo : 'Escreva um pouco sobre você.'}
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