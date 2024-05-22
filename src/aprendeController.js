const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const aprendeSchema = joi.object({
    quantidade: joi.string().required(),
    cod_magia: joi.string().required(),
    cod_classe: joi.string().required()
})

exports.listaAprende = (req, res) => {
    db.query('select * from aprende', (err, result) => {
        if (err) {
            console.error('erro ao listar aprende:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
        }
        res.json(result)
    })
}

exports.buscarAprende = (req, res) => {
    const { cod_aprende } = req.params
    db.query('select * from aprende where cod_aprende = ?', cod_aprende, (err, result) => {
        if (err) {
            console.error('erro ao buscar aprende:', err)
            res.status(500).json({ error: 'aprende nao encontrado' })
            return;
        }
        res.json(result[0])
    })
}

exports.adicionarAprende = (req, res) => {
    const { quantidade, cod_magia, cod_classe } = req.body
    const { error } = aprendeSchema.validate({ quantidade, cod_magia, cod_classe })
    if (error) {
        res.status(400).json({ error: 'dados de aprende invalidos' })
        return
    }
    const novoAPrende = {
        quantidade,
        cod_magia,
        cod_classe
    }
    db.query('insert into aprende set ?', novoAPrende, (err, result) => {
        if (err) {
            console.error('erro ao adicionar aprende:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'aprende adicionado com sucesso' })
    })
}

exports.atualizarAprende = (req, res) => {
    const { cod_aprende } = req.params
    const { quantidade, cod_magia, cod_classe } = req.body;
    const { error } = aprendeSchema.validate({ quantidade, cod_magia, cod_classe })
    if (error) {
        res.status(400).josn({ error: 'dados invalidos' })
        return
    }
    const aprendeAtualizado = {
        quantidade,
        cod_magia,
        cod_classe
    }
    db.query('update aprende set ? where cod_aprende = ?', [aprendeAtualizado, cod_aprende], (err, result) => {
        if (err) {
            console.error('erro ao atualizar aprende:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'usuario atualizado com sucesso' })
    })
}

exports.deletarAprende = (req, res) => {
    const { cod_aprende } = req.params
    db.query('delete from aprende where cod_aprende = ?', cod_aprende, (err, result) => {
        if (err) {
            console.error('erro ao deletar aprende:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'personagem deletado com sucesso' })
    })
}