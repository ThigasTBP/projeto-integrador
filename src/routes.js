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
const poderClasseController=require('./poderesClasseController')
const aprendeController=require('./aprendeController')
const magiaController=require('./magiaController')

router.post('/login', loginController.loginUser)

router.get('/user', loginController.autenticarToken, usercontroller.listaUser);
router.get('/user/:id_user', loginController.autenticarToken, usercontroller.buscarUser);
router.post('/user', usercontroller.adicionarUser);
router.patch('/user/:id_user', loginController.autenticarToken, usercontroller.atualizarUser);
router.delete('/user/:id_user', loginController.autenticarToken, usercontroller.deletarUser);

router.get('/personagem', personagemcontroller.listaPersonagem)
router.get('/personagem/:cod_personagem', loginController.autenticarToken, personagemcontroller.buscarPersonagem)
router.post('/personagem', personagemcontroller.adicionarPersonagem)
router.patch('/personagem/:cod_personagem',loginController.autenticarToken, personagemcontroller.atualizarPersonagem)
router.delete('/personagem/:cod_personagem',loginController.autenticarToken,personagemcontroller.deletarPersonagem)

router.get('/raca', racacontroller.listaRaca)
router.get('/raca/:cod_raca', racacontroller.buscarRaca)
router.post('/raca', loginController.autenticarToken, racacontroller.adicionarRaca)
router.patch('/raca/:cod_raca', loginController.autenticarToken, racacontroller.atualizarRaca)
router.delete('/raca/:cod_raca', loginController.autenticarToken, racacontroller.deletarRaca)

router.get('/classe', classecontroller.listaClasse);
router.get('/classe/:cod_classe', loginController.autenticarToken, classecontroller.buscarClasse);
router.post('/classe', loginController.autenticarToken, classecontroller.adicionarClasse )
router.patch('/classe/:cod_classe', loginController.autenticarToken, classecontroller.atualizarClasse)
router.delete('/classe/:cod_classe', loginController.autenticarToken, classecontroller.deletarClasse)

router.get('/habilidaderacial', loginController.autenticarToken, habilidadeRacialcontroller.listaHabilidadeRacial)
router.get('/habilidaderacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.buscarHabilidadeRacial)
router.post('/habilidaderacial', loginController.autenticarToken, habilidadeRacialcontroller.adicionarHabilidadeRacial)
router.patch('/habilidaderacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.atualizarHabilidadeRacial)
router.delete('/habilidaderacial/:cod_habilidade', loginController.autenticarToken, habilidadeRacialcontroller.deletarHabilidadeRacial)

router.get('/poderclasse', loginController.autenticarToken, poderClasseController.listaPoderesClasse)
router.get('/poderclasse/:cod_poder', loginController.autenticarToken, poderClasseController.buscarPoderesclasse)
router.post('/poderclasse',loginController.autenticarToken, poderClasseController.adicionarPoderClasse)
router.patch('/poderclasse/:cod_poder', loginController.autenticarToken, poderClasseController.atualizarPoderClasse)
router.delete('/poderclasse/:cod_poder', loginController.autenticarToken, poderClasseController.deletarPoderClasse)

router.get('/aprende', loginController.autenticarToken, aprendeController.listaAprende)
router.get('/aprende/:cod_aprende', loginController.autenticarToken, aprendeController.buscarAprende)
router.post('/aprende', loginController.autenticarToken, aprendeController.adicionarAprende)
router.patch('/aprende/:cod_aprende', loginController.autenticarToken, aprendeController.atualizarAprende)
router.delete('/aprende/:cod_aprende', loginController.autenticarToken, aprendeController.deletarAprende)

router.get('/magia', loginController.autenticarToken, magiaController.listaMagia)
router.get('/magia/:cod_magia', loginController.autenticarToken, magiaController.buscarMagia)
router.post('/magia', loginController.autenticarToken, magiaController.adicionarMagia)
router.patch('/magia/:cod_magia', loginController.autenticarToken, magiaController.atualizarMagia)
router.delete('/magia/:cod_magia', loginController.autenticarToken, magiaController.deletarMagia)

module.exports = router;