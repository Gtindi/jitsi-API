<h1>Jitsi API</h1>
<ul>
<li> `GET /api/captureLargeVideoScreenshot` : This endpoint will capture a large video screenshot. </li>
<li> `GET /api/getAvailableDevices`: This endpoint will retrieve a list of available devices. </li>
<li> `GET /api/getContentSharingParticipants`: This endpoint will retrieve an array of currently sharing participants ID's. </li>
<li> `GET /api/getCurrentDevices`: This endpoint will retrieve a list of currently selected devices. </li>
<li> `GET /api/getDeploymentInfo`: This endpoint will retrieve information about the deployment. </li>
<li> `GET /api/getLivestreamUrl`: This endpoint will retrieve information about the current live stream. </li>
<li> `GET /api/getParticipantsInfo`: This endpoint is deprecated and will retrieve an array of participant information. </li>
<li> `GET /api/getRoomsInfo`: This endpoint will retrieve an array of available rooms and their details. </li>
<li> `GET /api/getVideoQuality`: This endpoint will retrieve the current video quality setting. </li>
</ul>
The front-end developer can send GET requests to these endpoints to retrieve data or perform actions on the server.

These endpoints are all available on the server running on port 4000. Additionally, there is a socket.io endpoint that handles the join and disconnect events when a user connects or disconnects from a room.

