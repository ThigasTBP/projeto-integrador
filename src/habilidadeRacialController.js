const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const habilidadeRacialSchema = joi.object({
    nome: joi.string().required(),
    cod_raça: joi.string().required()
})

exports.listaHabilidadeRacial = (req, res) => {
    db.query('select * from habilidade_racial', (err, result) => {
        if (err) {
            console.error('erro ao listar habilidades de raça:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
        }
        res.json(result);
    })
}

exports.buscarHabilidadeRacial = (req, res) => {
    const { cod_habilidade } = req.params;
    db.query('select * from habilidade_racial where cod_habilidade = ?', cod_habilidade, (err, result) => {
        if (err) {
            console.error('erro ao buscar habilidade racial', err)
            res.status(500).json({ error: 'habilidade de raça nao encontrada' })
            return;
        }
        res.json(result[0])
    })
}

exports.adicionarHabilidadeRacial = (req, res) => {
    const { nome, cod_raça } = req.body;
    const { error } = habilidadeRacialSchema.validate({ nome, cod_raça });
    if (error) {
        res.status(400).json({ error: 'dados de habilidade racial invalidas' });
        return;
    }
    const novoHabilidadeRacial = {
        nome,
        cod_raça
    }
    db.query('insert into habilidade_racial set ?', novoHabilidadeRacial, (err, result) => {
        if (err) {
            console.error('erro ao adicionar habilidade de raça:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        res.json({ message: 'habilidade de raça adicionado com sucesso' })
    })
}

exports.atualizarHabilidadeRacial = (req, res) => {
    const { cod_habilidade } = req.params;
    const { nome, cod_raça } = req.body;
    const { error } = habilidadeRacialSchema.validade({ nome, cod_raça });
    if (error) {
        res.status(400).json({ error: 'dados invalidos' })
        return;
    }
    const habilidadeRacialAtualizado = {
        nome,
        cod_raça
    }
    db.query('update habilidade_racial set ? where cod_habilidade = ?', [habilidadeRacialAtualizado, cod_habilidade], (err) => {
        if (err) {
            console.error('erro ao atualizar habilidade racial:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return
        }
        res.json({ message: 'habilidade racial atualizado com sucesso' });
    })
}

exports.deletarHabilidadeRacial = (req, res) => {
    const { cod_habilidade } = req.params;
    db.query('delete from habilidade_racial where cod_habilidade = ?', cod_habilidade, (err, result) => {
        if (err) {
            console.error('erro ao deletar habilidade racial:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'habilidade racial deletada com sucesso' })
    })
}