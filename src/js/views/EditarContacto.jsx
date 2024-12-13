import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext.js";

import "../../styles/demo.css";
import EditarFormulario from "../component/EditarFormulario.jsx";

export const EditarContacto = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
			<EditarFormulario />
		</div>
	);
};
