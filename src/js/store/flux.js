import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendas: [],
			contactosRandomUser: [],
			contactos: [],
			contactosLocal: [],
			nombre: [],
			address: [],
			phone: [],
			email: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			importarAgendasRandom: (user) => {
				fetch(`https://randomuser.me/api/?results=${user}&gender=male&nat=es`)
					.then(response => response.json())
					.then(response => setStore({ "contactosRandomUser": response.results }))
					.catch(error => console.log(error))
			},
			crearAgenda: () => {
				fetch("https://playground.4geeks.com/contact/agendas/AngelGB", {
					method: "POST"
				})
					.then(response => response.json())
					.then(response => getActions().recuperarAgenda())
			},
			recuperarAgenda: () => {
				fetch("https://playground.4geeks.com/contact/agendas/AngelGB/contacts")
					.then(response => response.json())
					.then(response => setStore({ "contactos": response.contacts }))
					.catch(error => console.log(error))
			},
			actualizarNombre: (nuevoNombre) => {
				setStore({ nombre: [nuevoNombre] });
			},
			actualizarTelefono: (nuevoTelefono) => {
				setStore({ phone: [nuevoTelefono] });
			},
			actualizarEmail: (nuevoEmail) => {
				setStore({ email: [nuevoEmail] });
			},
			actualizarDireccion: (nuevaDireccion) => {
				setStore({ address: [nuevaDireccion] });
			},
			crearContacto: (contacto) => {
				fetch("https://playground.4geeks.com/contact/agendas/AngelGB/contacts", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contacto)
				})
					.then(response => response.json())
					.then(() => getActions().recuperarAgenda())
					.catch((error) => console.log(error));
			},
			editarContacto: (id, contacto) => {
				fetch(`https://playground.4geeks.com/contact/agendas/AngelGB/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contacto)
				})
					.then(response => response.json())
					.then(() => getActions().recuperarAgenda())
					.catch((error) => console.log(error));
			},
			eliminarContacto: (id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/AngelGB/contacts/${id}`, {
					method: "DELETE",
				})
					.then(() => getActions().recuperarAgenda())
					.catch((error => console.log(error)))
			}
		}
	};
};

export default getState;
