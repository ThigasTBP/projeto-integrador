const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const usercontroller = require('./usercontroller')
const loginController=require('./logincontroller')

router.post('/login', loginController.loginUser)

router.get('/user', loginController.autenticarToken, usercontroller.listaUser);
router.get('/user/:id_user', loginController.autenticarToken, usercontroller.buscarUser);
router.post('/user', usercontroller.adicionarUser);
router.patch('/user/:id_user', usercontroller.atualizarUser);
router.delete('/user/:id_user', loginController.autenticarToken, usercontroller.deletarUser);

module.exports = router;