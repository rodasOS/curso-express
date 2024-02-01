const express = require('express');
const routerProgramacion = express.Router();
const { programacion } = require('../datos/cursos.js').infoCursos;

//  --> Esto nos permite procesar el cuerpo de una solicitud en formato JSON
//      Middleware:
//        Estas funciones se ejecutan despues de recibir una solicitud y antes de enviar una respuesta.
//        Tienen acceso al objeto de la respuesta y a next(), una función que se llama para ejecutar el proximo middleware.
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
	if (req.query.ordenar === 'vistas') {
		return res.send(JSON.stringify(programacion.sort((a, b) => b.vistas - a.vistas)));
	}

	return res.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (req, res) => {
	const lenguaje = req.params.lenguaje;
	const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);

	if (resultado.length === 0) {
		return res.status(404).send(`no hay cursos de "${lenguaje}" brou.`);
	}

	if (req.query.ordenar === 'vistas') {
		return res.send(JSON.stringify(resultado.sort((a, b) => b.vistas - a.vistas)));
	}

	return res.send(JSON.stringify(resultado));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
	const lenguaje = req.params.lenguaje;
	const nivel = req.params.nivel;
	resultado = programacion.filter((curso) => curso.lenguaje === lenguaje && curso.nivel === nivel);

	if (resultado.length === 0) {
		return res.status(404).send(`No se encontraron cursos de "${lenguaje}" de nivel "${nivel}" 😔.`);
	}

	return res.send(JSON.stringify(resultado));
});

routerProgramacion.post('/', (req, res) => {
	let cursoNuevo = req.body;

	programacion.push(cursoNuevo);
	res.send(JSON.stringify(programacion));
});

routerProgramacion.put('/:id', (req, res) => {
	const cursoActualizado = req.body;
	const id = req.params.id;
	const indice = programacion.findIndex((curso) => curso.id == id);

	if (indice >= 0) {
		programacion[indice] = cursoActualizado;
	}

	res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) => {
	const infoActualizada = req.body;
	const id = req.params.id;
	const indice = programacion.findIndex((curso) => curso.id == id);

	if (indice >= 0) {
		const cursoAModificar = programacion[indice];

		//Metodo assing(objeto, datosActualizados)
		//Este método nos permite actualizat solo algunas
		//propiedades de un objeto
		Object.assign(cursoAModificar, infoActualizada);
	}

	res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res) => {
	const id = req.params.id;
	const indice = programacion.findIndex((curso) => curso.id == id);

	if (indice >= 0) {
		// .splice()
		//    Este metodo nos permite eliminar uno o varios elementos a partir del indice indicado
		programacion.splice(indice, 1);
	}

	res.send(JSON.stringify(programacion));
	// res.send(programacion);
	// res.json(programacion);
});

module.exports = routerProgramacion;
