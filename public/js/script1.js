const socket = io('/'); // Connect to the server
const peer = new Peer();
let myVideoStream;
let myId;
const videoGrid = document.getElementById('videoDiv');

// Store peer connections in an object
const peerConnections = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    myVideoStream = stream;
    addVideo(myVideoStream); // Add local video to the grid
    peer.on('call', call => {
        call.answer(stream); // Answer incoming calls with our stream
        const vid = document.createElement('video');
        call.on('stream', userStream => {
            addVideo(userStream); // Add remote video to the grid
        });
        call.on('close', () => {
            vid.remove(); // Remove video element when call ends
        });
        peerConnections[call.peer] = call;
    });
}).catch(err => {
    console.error(err);
});

peer.on('open', (id) => {
    myId = id;
    socket.emit("newUser", id, roomID); // Emit new user event with ID and room ID
});

peer.on('error', (err) => {
    console.error(err);
});

socket.on('userJoined', id => {
    console.log("New user joined:", id);
    const call = peer.call(id, myVideoStream); // Call the new user with our stream
    call.on('stream', userStream => {
        addVideo(userStream); // Add remote video to the grid
    });
    call.on('close', () => {
        removeVideo(id); // Remove video element when call ends
    });
    peerConnections[id] = call;
});

socket.on('userDisconnect', id => {
    if (peerConnections[id]) {
        peerConnections[id].close(); // Close the peer connection
        removeVideo(id); // Remove video element
    }
});

function addVideo(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.muted = stream === myVideoStream; // Mute our own video
    videoGrid.appendChild(video);
}

function removeVideo(id) {
    const videoElement = document.querySelector(`video[data-peer-id="${id}"]`);
    if (videoElement) {
        videoElement.remove();
    }
}
