const express = require('express');
const multer = require('multer');
const mysql = require('./database/mysql_connection');
const participants = require('./database/participants');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/register', upload.single('image'), (req, res) => {
    const { name, email } = req.body;
    const image = req.file ? req.file.filename : null;

    participants.createParticipant(name, email, image, (err, result) => {
        if (err) {
            console.error('Error saving participant:', err);
            return res.status(500).send('Failed to save participant data');
        }
        res.status(200).send('Participant data saved successfully');
    });
});

app.get('/participant/:id', (req, res) => {
    const participantId = req.params.id;

    participants.getParticipantById(participantId, (err, participant) => {
        if (err) {
            console.error('Error retrieving participant:', err);
            return res.status(500).send('Failed to fetch participant data');
        }
        res.json(participant);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
