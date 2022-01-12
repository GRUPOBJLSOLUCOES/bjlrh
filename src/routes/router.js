import { Router } from 'express'
import Users from '../controllers/UserController'
import Equipe from '../controllers/EquipeController'
import Setor from '../controllers/SetorController'
import API from '../controllers/APIControllers/ListSetores'
export const router = new Router()

// ! User routes
router.post('/novousuario/', Users.Create)
router.get('/listarusuarios/', Users.List)
router.post('/buscarusuario/', Users.Find)
router.post('/editpassword/', Users.ChangePass)
router.post('/editarusuario/', Users.Update)
router.delete('/deletarusuario/', Users.Delete)

// ! Setor routes
router.post('/novosetor/', Setor.Create)
router.get('/listarsetor/', Setor.List)
router.post('/buscarsetor/', Setor.Find)
router.post('/atualizarsetor/', Setor.Update)
router.delete('/deletarsetor/', Setor.Delete)

// ! Equipe routes
router.post('/novaequipe/',Equipe.Create)
router.get('/listarequipe/', Equipe.List)
router.post('/buscarequipe/', Equipe.Find)
router.post('/atualizarequipe/', Equipe.Update)
router.delete('/deletarequipe/', Equipe.Delete)


// ? API Routes
router.get('/listagemequipe/',API.FindEquipes)