const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const testeSchema = joi.object({
    teste: joi.string().required(),
    nome: joi.string().required()
});

exports.listaTeste = (req, res) => {
    db.query('select * from teste', (err, result) => {
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

exports.adicionarTeste = (req, res) => {
    const { teste, nome } = req.body;
    const { error } = testeSchema.validate({ teste, nome });
    if (error) {
        res.status(400).json({ error: 'dados invalidos' });
        return;
    }
    const novoTeste = {
        teste,
        nome
    }
    db.query('insert into teste set ?', novoTeste, (err, result) => {
        if (err) {
            console.error('erro ao adicionar teste:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json({ message: 'teste adicionado com sucesso' })
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