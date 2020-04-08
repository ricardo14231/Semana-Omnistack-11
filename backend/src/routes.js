const express = require('express');

const routes = express.Router();

const ongController = require('./controllers/ongController');

const incidentController = require('./controllers/incidentController');

const profileController = require('./controllers/profileController');

const sessionController = require('./controllers/sessionController');


routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incident', incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);

routes.get('/profile', profileController.index); 

routes.post('/session', sessionController.create);


module.exports = routes;