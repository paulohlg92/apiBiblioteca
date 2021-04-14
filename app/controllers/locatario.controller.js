const db = require ("../models");

Locatario = db.locatarios;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome){
        res.status(400).send({
            message: "Nome não pode ser vazio!"
        })
        return;
    }
    const locatario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        statusCadastro: req.body.statusCadastro ? req.body.statusCadastro : true
    }
    Locatario.create(locatario)
    .then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Erro interno ao criar o locatário"
        });
    });
};

exports.findAll = (req, res) => {
    Locatario.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os locatários"
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

exports.findAllActive = (req, res) => {
    Locatario.findAll({where: {statusCadastro: true}})
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar locatarios"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Locatario.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Locatario atualizado"
            });
        } else {
            res.send ({
                message: `Não foi possível atualizar o locatário de id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao atualizar locatário de id: ${id}`
        })
    })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Locatario.destroy( {where: {id: id}})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Locatário apagado com sucesso"
            });
        } else {
            res.send ({
                message: `Não foi possível apagar o locatário de id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao apagar locatário de id: ${id}`
        })
    })
};

exports.deleteAll = (req, res) => {
    Locatario.destroy({where: {},
    truncate: false})
    .then(nums => {
        res.send({message: `${nums} Locatários deletados com sucesso`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro ao deletar todos os locatários"
        })
    })
};