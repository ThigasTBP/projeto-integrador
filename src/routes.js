const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const usercontroller = require('./usercontroller')
const loginController=require('./logincontroller')
const personagemcontroller=require('./personagemcontroller')
const racacontroller=require('./racacontroller')
const classecontroller=require('./classecontroller')
const habilidadeRacialcontroller=require('./habilidadeRacialController')

router.post('/login', loginController.loginUser)

router.get('/user', loginController.autenticarToken, usercontroller.listaUser);
router.get('/user/:id_user', loginController.autenticarToken, usercontroller.buscarUser);
router.post('/user', usercontroller.adicionarUser);
router.patch('/user/:id_user', loginController.autenticarToken, usercontroller.atualizarUser);
router.delete('/user/:id_user', loginController.autenticarToken, usercontroller.deletarUser);

router.get('/personagem', loginController.autenticarToken, personagemcontroller.listaPersonagem)
router.get('/personagem/:cod_personagem', loginController.autenticarToken, personagemcontroller.buscarPersonagem)
router.post('/personagem',loginController.autenticarToken, personagemcontroller.adicionarPersonagem)
router.patch('/personagem/:cod_personagem',loginController.autenticarToken, personagemcontroller.atualizarPersonagem)
router.delete('/personagem/:cod_personagem',loginController.autenticarToken,personagemcontroller.deletarPersonagem)

router.get('/raca', loginController.autenticarToken, racacontroller.listaRaca)
router.get('/raca/:cod_raca', loginController.autenticarToken, racacontroller.buscarRaca)
router.post('/raca', loginController.autenticarToken, racacontroller.adicionarRaca)
router.patch('/raca/:cod_raca', loginController.autenticarToken, racacontroller.atualizarRaca)
router.delete('/raca/:cod_raca', loginController.autenticarToken, racacontroller.deletarRaca)

router.get('/classe', loginController.autenticarToken, classecontroller.listaClasse);
router.get('/classe/:cod_classe', loginController.autenticarToken, classecontroller.buscarClasse);
router.post('/classe', loginController.autenticarToken, classecontroller.adicionarClasse )
router.patch('/classe/:cod_classe', loginController.autenticarToken, classecontroller.atualizarClasse)
router.delete('/classe/cod_classe', loginController.autenticarToken, classecontroller.deletarClasse)

router.get('/habilidadeRacial', loginController.autenticarToken, habilidadeRacialcontroller.listaHabilidadeRacial)
router.get('/habilidadeRacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.listaHabilidadeRacial)
router.post('/habilidadeRacial', loginController.autenticarToken, habilidadeRacialcontroller.adicionarHabilidadeRacial)
router.patch('/habilidadeRacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.atualizarHabilidadeRacial)
router.delete('/habilidadeRacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.deletarHabilidadeRacial)

module.exports = router;