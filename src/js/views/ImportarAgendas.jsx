import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FaUndoAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const ImportarAgendas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [users, setUsers] = useState("");

    useEffect(() => {
        if (users) {
            actions.importarAgendasRandom(users);
        }
    }, [users, actions]);

    const formulario = () => {
        return users == "1" || users == "2" || users == "5";
    };

    const paginaPrincipal = () => {
        navigate("/")
    }

    const usuariosImportados = () => {
        store.contactosRandomUser.forEach(user => {
            const contacto = {
                name: user.name.first + " " + user.name.last,
                phone: user.phone,
                email: user.email,
                address: user.location.street.name + " " + user.location.street.number,
            };
            actions.crearContacto(contacto)
        });
        setTimeout(() => {
            paginaPrincipal();
        }, 100)
    };
    return (
        <div className="container d-flex justify-content-center">
            <div className="row p-5">
                <div className="input-group  col-7">
                    <span className="input-group-text col-8 text-center">Cuantos usuarios quieres importar?</span>
                    <select className="form-select " aria-label="Default select example"
                        onChange={(e) => { setUsers(e.target.value) }}>
                        <option value="">Seleccionar</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center p-3">
                    <button className="btn btn-info m-1"
                        onClick={usuariosImportados}
                        disabled={!formulario()}>Aceptar</button>
                    <Link to="/">
                        <button className="btn btn-info m-1"><FaUndoAlt /></button>
                    </Link>
                </div>
            </div>

        </div>
    );
};