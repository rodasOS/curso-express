const express = require('express');
const { infoCursos } = require('./datos/cursos');
const app = express();

//  --> Routers

const routerProgramacion = require('./routers/programacion');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

//  --> Routing

app.get('/', (req, res) => {
	res.send('Mi primer servidor con Express 💻.');
});

app.get('/api/cursos', (req, res) => {
	res.send(JSON.stringify(infoCursos));
});

//Esto va conseguir el valor del puerto si está definido como variable de entorno.
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor está escuchando en el puerto: ${PUERTO}...`);
});
