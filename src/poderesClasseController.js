const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const poderesClasseSchema = joi.object({
    nome: joi.string().required(),
    cod_classe: joi.string().required()
})

exports.listaPoderesClasse = (req, res) => {
    db.query('select * from poderes_classe', (err, result)=>{
        if (err) {
            console.error('erro ao listar poderes de classe:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
        }
        res.json(result);
    })
}

exports.buscarPoderesclasse = (req, res) => {
    const {cod_poder} = req.params;
    db.query('select * from poderes_classe where cod_poder = ?', cod_poder, (err, result) => {
        if (err) {
            console.error('erro ao buscar poder de classe', err)
            res.status(500).json({ error: 'poder de classe nao encontrado' })
            return
        }
        res.json(result[0])
    })
}

exports.adicionarPoderClasse = (req, res) => {
    const { nome, cod_classe } = req.body;
    const { error } = poderesClasseSchema.validate ({ nome, cod_classe });
    if (error) {
        res.status(400).json({ error: 'dodos de poder de classe' });
        return
    }
    const novoPoderClasse = {
        nome,
        cod_poder
    }
    db.query('insert into poder_classe set ?', novoPoderClasse, (err, result) => {
        if (err) {
            console.error('erro ao adicionar novo poder de classe:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        res.json({ message: 'poder de classe adicionado com sucesso'})
    })
}

exports.atualizarPoderClasse = (req, res) => {
    const {cod_poder} = req.params
    const {nome, cod_classe} = req.body
    const {error} = poderesClasseSchema.validade({ nome, cod_classe});
    if (error) {
        res.status(400).json({ error: 'dados invalidos'})
        return;
    }
    const poderClasseAtualizado = {
        nome,
        cod_classe
    }
    db.query('update poder_classe set ? where cod_poder = ?', [poderClasseAtualizado, cod_poder], (err) => {
        if (err) {
            console.error('erro ao atualizar poder de classe:', err);
            res.status(500).json({ error: 'ero interno do servidor' });
            return
        }
        res.json({ message: 'poder de classe atualizado com sucesso' })
    })
}

exports.deletarPoderClasse = (req, res) => {
    const{ cod_poder } = req.params;
    db.query('delete from poder_classe where cod_poder = ?', cod_poder, (err, result) => {
        if (err) {
            console.error('erro ao deletar poder de classe:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'poder racial deletado com sucesso' })
    })
}