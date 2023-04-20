//  importing the necessary modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { JitsiMeetJS } = require('lib-jitsi-meet');

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

