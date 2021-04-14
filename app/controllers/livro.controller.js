const db = require ("../models");

Livro = db.livros;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome){
        res.status(400).send({
            message: "Nome não pode ser vazio!"
        })
        return;
    }
    const livro = {
        nome: req.body.nome,
        autor: req.body.autor,
        sinopse: req.body.sinopse,
        dataLancamento: req.body.dataLancamento,
        dataAluguel: req.body.dataAluguel,
        status: req.body.status ? req.body.status : "disponivel"
    }
    Livro.create(livro)
    .then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Erro interno ao criar o livro"
        });
    });
};

exports.findAll = (req, res) => {
    Livro.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os livros"
        });
    });
};

exports.findAllDisponiveis = (req, res) => {
    Livro.findAll({where: {status: "disponivel"}})
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar livros disponíveis"
        });
    });
};

exports.findByAutor = (req, res) => {
    const autor = req.params.autor;
    Livro.findAll({where: {autor: autor}})
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar livros deste autor"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Livro.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Livro atualizado"
            });
        } else {
            res.send ({
                message: `Não foi possível atualizar o livro de id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao atualizar livro de id: ${id}`
        })
    })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Livro.destroy( {where: {id: id}})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Livro apagado com sucesso"
            });
        } else {
            res.send ({
                message: `Não foi possível apagar o livro de id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao apagar livro de id: ${id}`
        })
    })
};

exports.deleteAll = (req, res) => {
    Livro.destroy({where: {},
    truncate: false})
    .then(nums => {
        res.send({message: `${nums} Livros deletados com sucesso`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro ao deletar todos os livros"
        })
    })
};