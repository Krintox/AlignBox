const db = require('./mysql_connection');

const createParticipant = (name, email, image, callback) => {
    const sql = 'INSERT INTO participants (name, email, image) VALUES (?, ?, ?)';
    db.query(sql, [name, email, image], (err, result) => {
        if (err) {
            console.error('Error creating participant:', err);
            return callback('Failed to create participant.');
        }
        callback(null, result);
    });
};

const getParticipantById = (id, callback) => {
    const sql = 'SELECT * FROM participants WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching participant:', err);
            return callback('Failed to fetch participant.');
        }
        callback(null, result[0]);
    });
};

const getAllParticipants = (callback) => {
    const sql = 'SELECT * FROM participants';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching participants:', err);
            return callback('Failed to fetch participants.');
        }
        callback(null, result);
    });
};

module.exports = {
    createParticipant,
    getParticipantById,
    getAllParticipants,
};

