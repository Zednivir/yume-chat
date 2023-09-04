const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const messagesFilePath = './public/chats/history.json';

app.use(cors({
    origin: 'http://192.168.1.163:5500', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

// Endpoint to save messages
app.post('/save-message', (req, res) => {
  const { message, className, userAvatar, botAvatar, botDisplayName } = req.body;

  fs.readFile(messagesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading messages file:', err);
      res.status(500).json({ error: 'Error reading messages file' });
      return;
    }

    let messages = JSON.parse(data);
    const timestamp = new Date().toISOString();
    const newMessage = {
      timestamp,
      message,
      className,
      userAvatar,
      botAvatar,
      botDisplayName,
    };
    messages.push(newMessage);

    fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error('Error writing messages file:', err);
        res.status(500).json({ error: 'Error writing messages file' });
        return;
      }

      res.status(200).json({ message: 'Message saved successfully' });
    });
  });
});

const port = 1212;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
