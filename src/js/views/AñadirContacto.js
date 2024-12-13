import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

import "../../styles/demo.css";
import CrearFormulario from "../component/CrearFormulario.jsx";

export const AñadirContacto = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
			<CrearFormulario />
		</div>
	);
};
