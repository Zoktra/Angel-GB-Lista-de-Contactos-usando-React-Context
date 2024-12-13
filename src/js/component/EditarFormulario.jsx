import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditarFormulario = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dominioEmail, setDominioEmail] = useState("");


    useEffect(() => {
        const contacto = store.contactos.find((contacto) => contacto.id === parseInt(id));
        if (contacto) {
            setName(contacto.name);
            setAddress(contacto.address);
            setPhone(contacto.phone);
            setEmail(contacto.email);

            const [localPart, domainPart] = contacto.email.split("@");
        setEmail(localPart || '');
        setDominioEmail(domainPart ? `@${domainPart}` : '');
        }
    }, [id, store.contactos]);

    const formularioCompleto = () => {
        return name !== '' && address !== '' && phone !== '' && email !== '' && dominioEmail !== '';
    };

    const paginaPrincipal = () => {
        navigate("/")
    }

    const enviarContacto = () => {
        if (formularioCompleto()) {
            const emailCompleto = `${email}${dominioEmail}`;
            const contacto = {
                name: name,
                phone: phone,
                email: emailCompleto,
                address: address,
            };
            actions.actualizarNombre(name);
            actions.actualizarDireccion(address);
            actions.actualizarTelefono(phone);
            actions.actualizarEmail(emailCompleto);
            actions.editarContacto(id, contacto);
            toast.success('Contacto guardado correctamente', {
                action: {
                  label: 'ok',
                  onClick: paginaPrincipal
                },
              })
        }
    };

    return (
        <div className="container-fluid p-5">
            <div className="card">
                <div className="card-header text-center p-2">
                    <h3>Editar datos del contacto</h3>
                </div>
                <div className="card-body">
                    <div className="input-group p-2 ">
                        <span className="input-group-text col-12 col-md-3 col-lg-2">Nombre y apellido</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            maxLength={40}
                            className="form-control col-12 col-md-7 col-lg-10"
                        />
                    </div>
                    <div className="input-group p-2">
                        <span className="input-group-text  col-12 col-md-2">Dirección</span>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control  col-12 col-md-10"
                        />
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-5">
                            <div className="input-group p-2">
                                <span className="input-group-text col-12 col-md-4 col-lg-4">Teléfono</span>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel"
                                    className="form-control col-12 col-md-8 col-lg-8"
                                    maxLength={12}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="input-group p-2">
                                <span className="input-group-text col-12 col-lg-2">Email</span>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "@" || e.key === " ") {
                                            e.preventDefault();
                                        }
                                    }}
                                    type="email"
                                    className="form-control col-12 col-lg-10"
                                />
                                <select className="form-select" aria-label="Default select example"
                                onChange={(e) => {setDominioEmail(e.target.value)}}>
                                        <option value={dominioEmail}>{dominioEmail}</option>
                                        <option value="@hotmail.com">@hotmail.com</option>
                                        <option value="@yahoo.com">@yahoo.com</option>
                                        <option value="@gmail.com">@gmail.com</option>
                                    </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={enviarContacto}
                            disabled={!formularioCompleto()}
                            type="button"
                            className="btn btn-info m-1"
                        >
                            Guardar
                        </button>

                        <Link to="/">
                            <button type="button" className="btn btn-info m-1">Volver</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarFormulario;