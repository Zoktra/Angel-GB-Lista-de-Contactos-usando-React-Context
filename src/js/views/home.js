
import React, { useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "sonner";


export const Home = () => {
	const { store, actions } = useContext(Context)

	const fotoConIdFija = (id) => {
		// const genero = ${genero} store.genero
		return `https://randomuser.me/api/portraits/men/${id}.jpg`;
	};
	
	useEffect(() => {
		actions.recuperarAgenda()
		actions.importarAgendasRandom()
	}, [])

	return (
		<div className="container-fluid p-4">
			<div className="text-center mt-2">
				<div><h1>Tus contactos</h1></div>
			</div>
			<div className="row p-4">
				{store.contactos?.map((item, index) => {
					return (
						<div key={item.id} className="col-12 col-md-6 col-xl-4 p-3 ">
							<Link className="estilo" to={`/single/${item.id}`} >
								<div className="card rounded-pill fondo" key={index}>
									<div className="">
										<div className="card-body p-2 row">
											<div className="col-5 col-sm-4 col-md-5 col-lg-4 ">
												<img className="img-fluid rounded-circle float-start clearfix" src={fotoConIdFija(item.id)} />
											</div>
											<div className="d-flex align-items-center justify-content-center col-6 col-sm-6 col-md-6 col-lg-6 p-2">
												<h5>{item.name}</h5>
											</div>
										</div>
									</div>
								</div>
							</Link>
						</div>
					)
				})
				}
			</div>
		</div>
	)
}
