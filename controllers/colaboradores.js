module.exports = function(app) {

    app.get('/colaboradores', function(req, res){
        console.log('Recebida requisicao de Teste');
        res.send('OK');
    });

    app.get('/colaboradores/lista', function(req, res){
        console.log('Lista');
        var connection = app.persistencia.connectionFactory();
        var colaboradorDao = new app.persistencia.ColaboradorDao(connection);

        colaboradorDao.lista(function(erro, resultado){
            res.status(200).send(resultado);

        });
    });

    app.post('/colaboradores/colaborador', function(req, res){
        var colaborador = req.body;
        console.log('Processando requisicao de um novo colaborador');        

        colaborador.status = "Criado"
        colaborador.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var colaboradorDao = new app.persistencia.ColaboradorDao(connection);

        colaboradorDao.salva(colaborador, function(erro, resultado){
            req.assert("codigo", "Código é obrigatório").notEmpty();
            req.assert("nome", "Nome é obrigatório").notEmpty();

            var erros = req.validationErrors();
            if(erros){
                console.log('Erros de validação encontrados');
                res.status(500).send(erros);
                return
            }

            if(erro){
                res.status(400).send(erro);
                console.log('Erro ao inserir no banco: ' + erro);
            }else{
                console.log('Colaborador Criado');
                res.location('/colaboradores/colaborador/' + resultado.insertId);
                res.status(201).json(colaborador);
            }
        });

    })

}