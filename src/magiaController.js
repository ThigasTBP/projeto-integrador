const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const magiaSchema = joi.object({
    circulo: joi.string().max(1).required(),
    nome: joi.string().required(),
    tipo: joi.string().required()
})

exports.listaMagia = (req, res) => {
    db.query('select * from magia', (err, result) => {
        if (err) {
            console.error('erro ao listar magias:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
        }
        res.json(result[0])
    })
}

exports.buscarMagia = (req, res) => {
    const { cod_magia } = req.params
    db.query('select * from magia where cod_magia = ?', cod_magia, (err, result) => {
        if (err) {
            console.error('erro ao buscar magia', err)
            res.status(500).json({ error: 'magia nao encontrada' })
            return
        }
        res.json(result[0])
    })
}

exports.adicionarMagia = (req, res) => {
    const { circulo, nome, tipo } = req.body;
    const { error } = magiaSchema.validate({ circulo, nome, tipo })
    if (error) {
        res.status(400).josn({ error: 'dados de magia invalidos' })
        return
    }
    const novaMagia = {
        circulo,
        nome,
        tipo
    }
    db.query('insert into magia set ?', novaMagia, (err, result) => {
        if (err) {
            console.error('erro ao adicionar magia:', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'magia adicionada com sucesso' })
    })
}

exports.atualizarMagia = (req, res) => {
    const { cod_magia } = req.params;
    const { circulo, nome, tipo } = req.body;
    const { error } = magiaSchema.validate({ circulo, nome, tipo })
    if (error) {
        res.status(400).json({ error: 'dados invalidos' })
        return
    }
    const magiaAtualizada = {
        circulo,
        nome,
        tipo
    }
    db.query('update magia set ? where cod_magia = ?', [magiaAtualizada, cod_magia], (err, result) => {
        if (err) {
            console.error('erro ao atualizar a magia:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
        }
        res.json({ message: 'usuario atualizado com sucesso' })
    })
}

exports.deletarMagia = (req, res) => {
    const { cod_magia } = req.params;
    db.query('deletar from magia where cod_magia = ?', cod_magia, (err, result) => {
        if (err) {
            console.error('erro ao deletar magia:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'magia deletada com sucesso' })
    })
}