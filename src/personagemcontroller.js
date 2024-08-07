const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const personagemSchema = joi.object({
    cod_personagem: joi.string().required(),
    forca: joi.string().max(2).required(),
    destreza: joi.string().max(2).required(),
    constituicao: joi.string().max(2).required(),
    inteligencia: joi.string().max(2).required(),
    sabedoria: joi.string().max(2).required(),
    carisma: joi.string().max(2).required(),
    nome: joi.string().required(),
    // nivel_total: joi.string().max(2),
    // vida_atual: joi.string(),
    // mana_atual: joi.string(),
    // classe_armadura: joi.string().max(2),
    // id_user: joi.string(),
    cod_classe: joi.string().required(),
    cod_raca: joi.string().required()
});

exports.listaPersonagem = (req, res) => {
    db.query('select * from personagem', (err, result) => {
        if (err) {
            console.error('erro ao listar os personagem:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
        };
        res.json(result);
    });
};

exports.buscarPersonagem = (req, res) => {
    const { cod_personagem } = req.params;
    db.query('select * from personagem where cod_personagem = ?', cod_personagem, (err, result) => {
        if (err) {
            console.error('erro ao buscar personegem', err)
            res.status(500).json({ error: 'personagem nao encontrado' })
            return;
        };
        res.json(result[0])
    });
};

exports.adicionarPersonagem = (req, res) => {
    const { forca, destreza, constituicao, inteligencia, sabedoria, carisma, nome, cod_classe, cod_raca } = req.body;
    const { error } = personagemSchema.validate({ forca, destreza, constituicao, inteligencia, sabedoria, carisma, nome, cod_classe, cod_raca });
    if (error) {
        res.status(400).json({ error: 'dados de personagem invalidos' });
        return;
    }
    const novoPersonagem = {
        forca,
        destreza,
        constituicao,
        inteligencia,
        sabedoria,
        carisma,
        nome,
        cod_classe,
        cod_raca
    }
    db.query('insert into personagem set ?', novoPersonagem, (err, result) => {
        if (err) {
            console.error('erro ao adicionar personagem:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json({ message: 'personagem adicionado com sucesso' })
    });
};

exports.atualizarPersonagem = (req, res) => {
    const { cod_personagem } = req.params;
    const { forca, destreza, constituicao, inteligencia, sabedoria, carisma, nome, nivel_total, vida_atual, mana_atual, classe_armadura, id_user, cod_classe, cod_raca } = req.body;
    const { error } = personagemSchema.validate({ forca, destreza, constituicao, inteligencia, sabedoria, carisma, nome, nivel_total, vida_atual, mana_atual, classe_armadura, id_user, cod_classe, cod_raca });
    if (error) {
        res.status(400).json({ error: 'dados invalidos' });
        return;
    }
    const personagemAtualizado = {
        forca,
        destreza,
        constituicao,
        inteligencia,
        sabedoria,
        carisma,
        nome,
        nivel_total,
        vida_atual,
        mana_atual,
        classe_armadura,
        id_user,
        cod_classe,
        cod_raca
    };
    db.query('update personagem set ? where cod_personagem = ?', [personagemAtualizado, cod_personagem], (err, result) => {
        if (err) {
            console.error('erro ao atualizar o personagem:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return
        };
        res.json({ message: 'personagem atualizado com sucesso' });
    });
};

exports.deletarPersonagem = (req, res) => {
    const { cod_personagem } = req.params;
    db.query('delete from personagem where cod_personagem = ?', cod_personagem, (err, result) => {
        if (err) {
            console.error('erro ao deletar personagem:', err)
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json({ message: 'personagem deletado com sucesso' });
    });
};