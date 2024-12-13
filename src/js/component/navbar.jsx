import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaAddressBook } from "react-icons/fa";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light mb-3 p-2">
			<Link className="estilo" to="/">
				<span className="navbar-brand mb-0 h1">Tu agenda <FaAddressBook /></span>
			</Link>
			<div>
				<Link to={"/AñadirContacto"}>
					<button type="button" className="btn btn-info m-1">Crear contacto</button>
				</Link>
				<Link to={"/ImportarAgendas"}>
					<button type="button" className="btn btn-info m-1" >Importar contactos</button>
				</Link>

			</div>

		</nav>
	);
};