const db = require('./mysql_connection').default;

const createParticipant = (name, email, image, callback) => {
    const sql = 'INSERT INTO participants (name, email, image) VALUES (?, ?, ?)';
    db.query(sql, [name, email, image], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

const getParticipantById = (id, callback) => {
    const sql = 'SELECT * FROM participants WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

module.exports = {
    createParticipant,
    getParticipantById,
};
