const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const userSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().min(6).required()
})

exports.listaUser = (req, res) => {
    db.query('select * from usuario', (err, result) => {
        if (err) {
            console.error('erro ao buscar os usuarios:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
        };
        res.json(result);
    });
};

exports.buscarUser = (req, res) => {
    const { id_user } = req.params;
    db.query('select * from usuario where id_user = ?', id_user, (err, result) => {
        if (err) {
            console.error('erro ao buscar usuario', err);
            res.status(500).json({ error: 'usuario nao encontrado' });
            return;
        };
        res.json(result[0]);
    });
};

exports.adicionarUser = (req, res) => {
    const { email, senha, } = req.body;
    const { error } = userSchema.validate({ email, senha });

    if (error) {
        res.status(400).json({ error: 'dados de cliente invalidos' });
        return;
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('error ao criptografar a senha:', err);
            res.status(500).json({ error: 'error interno do servidor' });
            return;
        }
        const novoUser = {
            email,
            senha: hash
        };
        db.query('insert into usuario set ?', novoUser, (err, result) => {
            if (err) {
                console.error('Error ao adicionar cliente:', err);
                res.status(500).json({ error: 'erro interno do servidor ' });
                return;
            };
            res.json({ message: 'cliente adicionado com sucesso' });
        });
    });
};

exports.atualizarUser = (req, res) => {
    const { id_user } = req.params;
    const { email, senha } = req.body;
    const { error } = userSchema.validate({ email, senha });
    if (error) {
        res.status(400).json({ error: 'dados invalidos' });
        return;
    };
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        const userAtualizado = {
            email,
            senha: hash
        };
        db.query('update usuario set ? where id_user = ?', [userAtualizado, id_user], (err, result) => {
            if (err) {
                console.error('erro ao atualizar usuario:', err);
                res.status(500).json({ error: 'erro interno do servidor' })
                return
            };
            res.json({ message: 'usuario atualizado com sucesso' });
        });
    });
};

exports.deletarUser = (req, res) => {
    const { id_user } = req.params;
    db.query('delete from usuario where id_user = ?', id_user, (err, result) => {
        if (err) {
            console.error('erro ao deletar cliente:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json({ message: 'usuario deletado com secesso' });
    });
};