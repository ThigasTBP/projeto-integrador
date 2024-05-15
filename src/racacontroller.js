const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const racaSchema = joi.object({
    nome: joi.string().required(),
    tamanho: joi.string().required(),
    deslocamento: joi.string().max(2).required(),
    forca: joi.string().max(2).required(),
    destreza: joi.string().max(2).required(),
    constituicao: joi.string().max(2).required(),
    inteligencia: joi.string().max(2).required(),
    sabedoria: joi.string().max(2).required(),
    carisma: joi.string().max(2).required()
})

exports.listaRaca = (req, res) => {
    db.query('select * from raca', (err, result) => {
        if (err) {
            console.error('erro ao listar raças:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
        }
        res.json(result);
    })
}

exports.buscarRaca = (req, res) => {
    const { cod_raca } = req.params;
    db.query('select * from raca where cod_raca = ?', cod_raca, (err, result) => {
        if (err) {
            console.error('erro ao buscar raca', err);
            res.status(500).json({ error: 'raca nao encontrada' })
            return
        }
        res.json(result[0])
    })
}

exports.adicionarRaca = (req, res) => {
    const { nome, tamanho, deslocamento, forca, destreza, constituicao, inteligencia, sabedoria, carisma } = req.body;
    const { error } = racaSchema.validate({ nome, tamanho, deslocamento, forca, destreza, constituicao, inteligencia, sabedoria, carisma });
    if (error) {
        res.status(400).json({ error: 'dados de raca invalidos' })
        return;
    }
    const novaraca = {
        nome,
        tamanho,
        deslocamento,
        forca,
        destreza,
        constituicao,
        inteligencia,
        sabedoria,
        carisma
    }
    db.query('insert into raca set ?', novaraca, (err, result) => {
        if (err) {
            console.error('erro ao adicionar raca:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        res.json({ message: 'raca adicionada com sucesso' });
    });
};
exports.atualizarRaca = (req, res) => {
    const { cod_raca } = req.params;
    const { nome, tamanho, deslocamento, forca, destreza, constituicao, inteligencia, sabedoria, carisma } = req.body;
    const { error } = racaSchema.validate({ nome, tamanho, deslocamento, forca, destreza, constituicao, inteligencia, sabedoria, carisma });
    if (error) {
        res.status(400).json({ error: 'dados de raca invalidos' })
        return;
    }
    const novaraca = {
        nome,
        tamanho,
        deslocamento,
        forca,
        destreza,
        constituicao,
        inteligencia,
        sabedoria,
        carisma
    }
    db.query('update raca set ? where cod_raca = ?', [novaraca, cod_raca], (err, result) => {
        if (err) {
            console.error('erro ao atualizar a raca:', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'raca atualizada com sucesso' })
    })
}

exports.deletarRaca = (req, res) => {
    const { cod_raca } = req.params;
    db.query('delete from raca where cod_raca = ?', cod_raca, (err, result) => {
        if (err) {
            console.error('erro ao deletar raca:', err)
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json({ message: 'raca deletada com sucesso' });
    });
};