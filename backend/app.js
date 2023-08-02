const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('./database/mysql_connection');
const participants = require('./database/participants');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

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
            return res.status(500).json({ error: 'Failed to save participant data' });
        }
        res.status(200).json({ message: 'Participant data saved successfully' });
    });
});

app.get('/participants', (req, res) => {
    participants.getAllParticipants((err, participants) => {
        if (err) {
            console.error('Error fetching participants:', err);
            return res.status(500).json({ error: 'Failed to fetch participant data' });
        }
        res.json(participants);
    });
});


app.get('/participant/:id', (req, res) => {
    const participantId = req.params.id;

    participants.getParticipantById(participantId, (err, participant) => {
        if (err) {
            console.error('Error retrieving participant:', err);
            return res.status(500).json({ error: 'Failed to fetch participant data' });
        }

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.json(participant);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
