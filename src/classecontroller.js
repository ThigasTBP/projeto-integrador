const joi = require('joi')
const db = require('./db')
const bcrypt = require('bcrypt')

const classeSchema = joi.object({
    nivel: joi.string().required(),
    vida: joi.string().required(),
    mana: joi.string().required(),
    nome: joi.string().required(),
    vida_nivel : joi.string().required(),
    proficiencia_arma: joi.string().required(),
    proficiencia_armadura: joi.string().required(),
    proficiencia_escudo: joi.string().required(),
})

exports.listaClasse = (req, res) => {
    db.query('select * from classe', (err, result) => {
        if (err) {
            console.error('erro ao listar classes:', err)
            res.status(500).json({ error: 'erro interno do servidor'})
        }
        res.json(result);
    })
}

exports.buscarClasse = (req, res) => {
    const { cod_classe } = req.params;
    db.query('select * from classe where cod_classe = ?', cod_classe, (err, result) => {
        if (err) {
            console.error('erro ao buscar classe', err);
            res.status(500).json({ error: 'classe nao encontrada' })
            return
        }
        res.json(result[0])
    })
}

exports.adicionarClasse = (req, res) => {
    const { nivel, vida, mana, nome, vida_nivel, proficiencia_arma, proficiencia_armadura, proficiencia_escudo} = req.body;
    const { error } = classeSchema.validate({ nivel, vida, mana, nome, vida_nivel, proficiencia_arma, proficiencia_armadura, proficiencia_escudo });
    if (error) {
        res.status(400).json({ error: 'dados de classe invalidos'})
        return;
    }
    const novaclasse = {
        nivel,
        vida,
        mana,
        nome,
        vida_nivel,
        proficiencia_arma,
        proficiencia_armadura,
        proficiencia_escudo
    }
    db.query('insert into classe set ?', novaclasse, (err, result) => {
        if (err) {
            console.error ('erro ao adicionar classe:', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'classe adicionada com sucesso' })
    })
}

exports.atualizarClasse = (req, res) => {
    const { cod_classe } = req.params;
    const { nivel, vida, mana, nome, vida_nivel, proficiencia_arma, proficiencia_armadura, proficiencia_escudo } = req.body;
    const { error } = classeSchema.validate({ nivel, vida, mana, nome, vida_nivel, proficiencia_arma, proficiencia_armadura, proficiencia_escudo })
    if (error) {
        res.status(400).json({ error: 'dados de classe invalidos' })
        return
    }
    const novaclasse = {
        nivel,
        vida,
        mana,
        nome,
        vida_nivel,
        proficiencia_arma,
        proficiencia_armadura,
        proficiencia_escudo
    }
    db.query('update classe set ? where cod_classe = ?', [novaclasse, cod_classe], (err, result) => {
        if (err) {
            console.error('erro ao atualizar a classe:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return
        }
        res.json({ message: 'classe atualizada com sucesso' })
    })
}

exports.deletarClasse = (req, res) => {
    const { cod_classe } = req.params;
    db.query('delete from classe where cod_classe = ?', cod_classe, (err, result) => {
        if (err) {
            console.error('erro ao deletar classe:', err)
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'classe deletada com sucesso'})
    })
}