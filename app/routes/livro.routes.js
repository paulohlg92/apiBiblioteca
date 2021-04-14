const { livros } = require("../models");

module.exports = app => {
    const livros = require ("../controllers/livro.controller");

    var router = require ("express").Router();

    router.post("/", livros.create);

    router.get("/", livros.findAll);
    router.get("/disponiveis", livros.findAllDisponiveis);
    router.get("/:autor", livros.findByAutor);
    router.put("/:id", livros.update);
    router.delete("/:id", livros.delete);
    router.delete("/", livros.deleteAll);

    app.use('/api/livros', router);
};