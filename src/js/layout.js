import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { AñadirContacto } from "./views/AñadirContacto.js";
import { EditarContacto } from "./views/EditarContacto.jsx";
import { ImportarAgendas } from "./views/ImportarAgendas.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import { Toaster } from "sonner";
import { Single } from "./views/single.jsx";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<Toaster richColors />
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/ImportarAgendas" element={<ImportarAgendas />} />
						<Route path="/EditarContacto/:id" element={<EditarContacto />} />
						<Route path="/single/:id" element={<Single />} />
						<Route path="/AñadirContacto" element={<AñadirContacto />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
