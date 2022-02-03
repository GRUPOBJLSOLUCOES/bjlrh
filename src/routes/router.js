import { Router } from 'express'
import Users from '../controllers/UserController'
import Equipe from '../controllers/EquipeController'
import Setor from '../controllers/SetorController'
import Colaborador from '../controllers/ColaboradorController'
import LotesHolerites from '../controllers/LoteHoleriteController'
import APILotes from '../controllers/APIControllers/ListLotes'
import APISetores from '../controllers/APIControllers/ListSetores'
import Email from '../controllers/MailController'
import APIColaboradores from '../controllers/APIControllers/ListColaboradores'
import APIFiles from '../controllers/FileController'

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

// Colaborador Routes
router.post('/novocolaborador/', Colaborador.Create)
router.get('/listarcolaborador/', Colaborador.List)


// ? API Routes
router.get('/listagemequipe/',APISetores.FindEquipes)
router.get('/listagemcolaboradores/',APIColaboradores.FindColaboradores)
router.get('/listagemlotes/', APILotes.ListLotes)


// ? Send email holerites
router.post('/holeriteemail/', Email.SendHoleriteEmail)

// ? Processamento de lotes
router.post('/processarpdf/', APIFiles.ProcessPDFDocument)
router.get('/listarlotespdf/', LotesHolerites.List)
router.get('/listarqtdlotes/', LotesHolerites.ListLength)

