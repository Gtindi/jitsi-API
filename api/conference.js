const { generateToken } = require('lib-jitsi-meet');
const Conference = require('../models/Conference');

const createConference = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Generate a unique room name and access token
    const roomName = generateRandomString();
    const token = generateToken({
      room: roomName,
      user: {
        name: 'Moderator',
      },
    });

    // Create a new conference document in the database
    const conference = new Conference({
      name,
      password,
      roomName,
      moderatorToken: token,
    });

    await conference.save();
    res.json({ conference });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getConference = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    res.json({ conference });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const generateRandomString = () => {
  const length = 10;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = {
  createConference,
  getConference,
};

