const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const usercontroller = require('./usercontroller')
const loginController=require('./logincontroller')
const personagemcontroller=require('./personagemcontroller')

router.post('/login', loginController.loginUser)

router.get('/user', loginController.autenticarToken, usercontroller.listaUser);
router.get('/user/:id_user', loginController.autenticarToken, usercontroller.buscarUser);
router.post('/user', usercontroller.adicionarUser);
router.patch('/user/:id_user', usercontroller.atualizarUser);
router.delete('/user/:id_user', loginController.autenticarToken, usercontroller.deletarUser);

router.get('/personagem', loginController.autenticarToken, personagemcontroller.listaPersonagem)
router.get('/personagem/:id_personagem', loginController.autenticarToken, personagemcontroller.buscarPersonagem)
router.post('/personagem',personagemcontroller.adicionarPersonagem)
router.patch('/personagem',personagemcontroller.atualizarPersonagem)
router.delete('/personagem',loginController.autenticarToken,personagemcontroller.deletarPersonagem)

module.exports = router;