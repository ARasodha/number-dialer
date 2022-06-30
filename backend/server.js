const express = require('express');
const { WebSocketServer } = require('ws');
const morgan = require('morgan');
const { modules: phoneNumbers } = require('./phoneNumbers');

const app = express();
const PORT = 5000;
const wss = new WebSocketServer({ port: 8080 });

app.use(morgan('dev'));
app.use(express.json())

app.get('/phoneNumbers', (req, res) => {
  wss.on('connection', () => {
    console.log('connected to websocket');
  });
  res.json(phoneNumbers).status(200);
});

app.post('/phoneWebhook', (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  res.status(200).end()
});

app.post('/call', async (req, res) => {
  const data = await axios.post('http://localhost:4830/call', req.body)
  data.phone = req.phone
})

// note: server sent events is better than websockets since traffic is only going from server => client 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

wss.on('connection', () => {
  console.log('connected to websocket');
});

