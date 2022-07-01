const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const { createSession } = require('better-sse');
const { modules: phoneNumbers } = require('./phoneNumbers');
const activeCalls = [];
const WEBHOOK_URL = 'http://localhost:5000/phoneWebhook';
const API_ADDRESS = 'http://localhost:4830/call';
let activeCall;
const app = express();
const PORT = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let session;

// app.get('/phoneNumbers', (req, res) => {
//   res.json(phoneNumbers);
// });

app.get('/sse', async(req, res) => {
  session = await createSession(req, res);
  session.push('hello');
  res.end();
  // res.send('success');
})

// app.get('/phoneWebhook', (req, res) => {
//   if (activeCall) {
//     // res.setHeader('Content-Type', 'text/event-stream');
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     console.log(activeCall);
//     res.json(activeCall);
//   } else {
//     res.json('error: No active call.')
//   }
// })

// app.post('/phoneWebhook', (req, res) => {
//   const { id, status } = req.body;
//   activeCall = activeCalls.find(call => call.callId === id);
//   activeCall.status = status;
//   res.end();
// });

// app.post('/call', async (req, res) => {
//   const phoneNumber = phoneNumbers.shift();
//   activeCalls.push(phoneNumber);
//   const { data } = await axios.post(API_ADDRESS, { phone: phoneNumber.phone, webhookURL: WEBHOOK_URL });
//   phoneNumber.callId = data.id;
//   res.end();
// });

// note: server sent events is better than websockets since traffic is only going from server => client 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



