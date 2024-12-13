import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const { id } = useParams();

	const fotoConIdFija = (id) => {
		return `https://randomuser.me/api/portraits/men/${id}.jpg`;
	};

	const paginaPrincipal = () => {
        navigate("/")
    }

	const eliminarContacto = (id) => {
		toast("¿Seguro que quieres eliminar este contacto?", {
			action: {
				label: "Eliminar",
				onClick: () => {
					actions.eliminarContacto(id);
					paginaPrincipal()
					toast.success("Contacto eliminado correctamente");
				},
			},
		});
	};

	useEffect(() => {
		actions.recuperarAgenda();
	}, []);

	const contacto = store.contactos?.find((item) => item.id.toString() === id);
	if (!contacto) {
		return <div className="container-fluid p-4 text-center"><h2>Contacto no encontrado</h2></div>;
	}

	return (
		<div className="container-fluid p-4">
			<div className="text-center mt-2">
				<div><h1>Detalle del contacto</h1></div>
			</div>
			<div className="p-2 d-flex justify-content-center">
				<div className="tarjetafull col-12 col-sm-11 col-md-10 col-lg-8 p-3">
					<div className="card fondo">
						<div className="tarjeta card-body p-2 d-flex justify-content-start row">
							<div className="col-12 col-sm-4 col-md-3 col-xl-2 imagenperfil">
								<img
									className="img-fluid rounded-circle float-start"
									src={fotoConIdFija(contacto.id)}
								/>
							</div>
							<div className="col-12 col-sm-8 col-md-9 col-xl-10 text-start text-fluid p-2">
								<h5><strong>{contacto.name}</strong></h5>
								<p className="card-text text-break"><FaMapMarkerAlt />: {contacto.address}</p>
								<p className="card-text text-break"><FaPhone />: {contacto.phone}</p>
								<p className="card-text text-break"><MdEmail />: {contacto.email}</p>
							</div>
						</div>
						<div className="card-footer">
							<div className="d-flex justify-content-center">
								<button className="btn btn-primary m-1">
									<Link to={`/EditarContacto/${contacto.id}`} >
										<FaUserEdit color="white" />
									</Link>
								</button>
								<button
									type="button"
									className="btn btn-primary m-1"
									onClick={() => eliminarContacto(contacto.id)}
								>
									<MdDelete />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};