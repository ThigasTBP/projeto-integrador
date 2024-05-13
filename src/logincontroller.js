const db = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRETE = 'Melhor rpg do Brasil'

exports.loginUser = (req, res) => {
    const { email, senha } = req.body;
    db.query('select * from usuario where email = ?', email, (err, results) => {
        if (err) {
            console.error('erro ao buscar usuario:', err);
            res.status(500).json({ error: "interno do servidor" });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'cliente nao encontrado' })
            return;
        }
        const usuario = results[0]

        bcrypt.compare(senha, usuario.senha, (err, passwordMatch) => {
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'credenciais invalidas' });
            } else {
                const token = jwt.sign({ email: usuario.email }, SECRETE, { expiresIn: '1h' });
                res.status(200).json({
                    auth: true,
                    token,
                    message: 'usuario logado'
                });
            };
        });
    });
};

exports.autenticarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'token nao fornecido' })
    }
    jwt.verify(token, SECRETE, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'token invalido' });
        };
        req.usuario = decoded;
        next()
    });
};