//  importing the necessary modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const { JitsiMeetJS } = require('lib-jitsi-meet');
const { createConference, getConference } = require('./api/conference');

// Initializing the JitsiMeetJS library
const initOptions = {
  disableAudioLevels: true,
  enableAnalyticsLogging: false,
  enableClosePage: false,
  enableNoAudioDetection: false,
  enableNoisyMicDetection: false,
  enableP2P: false,
  enableTalkWhileMuted: false,
  enableStatsID: false,
  p2p: {
    enabled: false,
  },
};

const jitsiConfig = {
  hosts: {
    domain: 'meet.jit.si',
    muc: 'conference.meet.jit.si',
  },
  bosh: 'https://meet.jit.si/http-bind',
  clientNode: 'http://jitsi.org/jitsimeet',
};

const jitsiOptions = {
  hosts: {
    domain: 'meet.jit.si',
    muc: 'conference.meet.jit.si',
  },
  serviceUrl: 'https://meet.jit.si/http-bind',
};

JitsiMeetJS.init(initOptions);

// Connect to the Jitsi server:
const connection = new JitsiMeetJS.JitsiConnection(null, null, jitsiOptions);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
  console.log('Jitsi connection established!');
});
connection.connect();

// Create a new Jitsi conference:
const conferenceOptions = {
  openBridgeChannel: true,
};

const conference = connection.initJitsiConference('myroom', conferenceOptions);

// Join the conference
conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
  console.log('Jitsi conference joined!');
  const localTracks = JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] });
  conference.addTrack(localTracks[0]);
});
conference.join();


const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb://localhost:27017/mydatabase';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.post('/api/conference/start', createConference);
app.get('/api/conference/:id', getConference);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

