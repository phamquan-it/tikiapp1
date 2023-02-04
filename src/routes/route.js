import express from 'express';
import HomeController from "../app/controller/HomeController.js"
import AuthController from "../app/controller/auth/client/AuthController.js"
// import all controllers
// import SessionController from './app/controllers/SessionController';
var app = express()

const routes = express.Router();
// Add routes
routes.get('/', HomeController.homepage);

routes.get('/login', AuthController.login);
routes.post('/form-login', AuthController.form_login);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default routes
