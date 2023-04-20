const express = require('express');
const JitsiMeetJS = require('jitsi-meet');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (data) => {
    socket.join(data.roomId);
    socket.broadcast.to(data.roomId).emit('user-connected', data.userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



// Set up MongoDB connection
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Error connecting to MongoDB', err);
  }
}

run();

// Set up Jitsi Meet API
const options = {
  hosts: {
    domain: 'meet.jit.si',
    muc: 'conference.meet.jit.si',
  },
  bosh: 'https://meet.jit.si/http-bind',
};

const api = new JitsiMeetJS.JitsiMeetExternalAPI('meet.jit.si', options);

// API function to capture a large video screenshot
app.get('/api/captureLargeVideoScreenshot', (req, res) => {
  api.captureLargeVideoScreenshot().then((data) => {
    res.send(data);
  });
});

// API function to retrieve a list of available devices
app.get('/api/getAvailableDevices', (req, res) => {
  api.getAvailableDevices().then((devices) => {
    res.send(devices);
  });
});

// API function to retrieve an array of currently sharing participants ID's
app.get('/api/getContentSharingParticipants', (req, res) => {
  api.getContentSharingParticipants().then((result) => {
    res.send(result);
  });
});

// API function to retrieve a list of currently selected devices
app.get('/api/getCurrentDevices', (req, res) => {
  api.getCurrentDevices().then((devices) => {
    res.send(devices);
  });
});

// API function to retrieve information about the deployment
app.get('/api/getDeploymentInfo', (req, res) => {
  api.getDeploymentInfo().then((deploymentInfo) => {
    res.send(deploymentInfo);
  });
});

// API function to retrieve information about the current live stream
app.get('/api/getLivestreamUrl', (req, res) => {
  api.getLivestreamUrl().then((livestreamData) => {
    res.send(livestreamData);
  });
});

// DEPRECATED API function to retrieve an array of participant information
app.get('/api/getParticipantsInfo', (req, res) => {
  api.getParticipantsInfo().then((participantsInfo) => {
    res.send(participantsInfo);
  });
});

// API function to retrieve an array of available rooms and their details
app.get('/api/getRoomsInfo', (req, res) => {
  api.getRoomsInfo().then((roomsInfo) => {
    res.send(roomsInfo);
  });
});

// API function to retrieve the current video quality setting
app.get('/api/getVideoQuality', (req, res) => {
  api.getVideoQuality().then((videoQuality) => {
    res.send(videoQuality);
  });
});








server.listen(4000, () => {
  console.log('Server running on port 4000');
});

