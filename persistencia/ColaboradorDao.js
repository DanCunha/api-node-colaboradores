function ColaboradorDao(connection) {
    this._connection = connection;
}

ColaboradorDao.prototype.salva = function(colaborador,callback) {
    this._connection.query('INSERT INTO Colaborador SET ?', colaborador, callback);
}

ColaboradorDao.prototype.atualiza = function(colaborador,callback) {
    this._connection.query('UPDATE Colaborador SET status = ? WHERE id = ?', [colaborador.status, colaborador.id], callback);
}

ColaboradorDao.prototype.lista = function(callback) {
    console.log('DAO Lista')
    this._connection.query('select * from Colaborador',callback);
}

ColaboradorDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from Colaborador where id = ?",[id],callback);
}

module.exports = function(){
    return ColaboradorDao;
};
