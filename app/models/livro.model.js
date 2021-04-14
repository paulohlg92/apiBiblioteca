module.exports = (sequelize, Sequelize) => {
    const Livro = sequelize.define("livro", {
        nome: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        sinopse: {
            type: Sequelize.STRING
        },
        dataLancamento: {
            type: Sequelize.STRING
        },
        dataAluguel: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return Livro;
};