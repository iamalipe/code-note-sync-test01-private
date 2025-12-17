SafalUtilities Connect WebRTC Doc

```js
const iceServers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun3.l.google.com:5349",
        "stun:stun3.l.google.com:3478",
        "stun:stun.l.google.com:5349",
        "stun:stun1.l.google.com:3478",
        "stun:stun1.l.google.com:5349",
        "stun:stun2.l.google.com:5349",
      ],
    },
  ],
};

// create new RTCPeerConnection every time user open the app
const newPeer = new RTCPeerConnection(iceServers);

// Optional: Add event listeners to the new peer for monitoring its state
newPeer.onconnectionstatechange = (event) => {
if (
newPeer.connectionState === "closed" ||
newPeer.connectionState === "failed" ||
newPeer.connectionState === "disconnected"
) {
console.warn("Peer connection closed, failed, or disconnected. Consider re-initializing."
);}};

// Call State when init the call
req?.io?.emit(`call-self:${userId}`, {
    type: type,
    data: newReturnData,
    from: userId,
    fromYou: true,
    to: otherUserId,
    roomMessage: messageDataObj,
});

req?.io?.emit(`call:${otherUserId}`, {
    type: type,
    data: newReturnData,
    from: userId,
    fromYou: false,
    to: otherUserId,
    offer: offer,
    roomMessage: messageDataObj,
});


// WebRTC Code
  const createOffer = useCallback(async () => {
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (err) {
      console.log("PEER ERROR createOffer", err);
      if (err?.message?.includes("closed")) {
        createNewPeer();
      }
      return null;
    }
  }, [peer, createNewPeer]);

  const createAnswer = useCallback(
    async (offer) => {
      try {
        // console.log("createAnswer", offer);
        if (!offer) return;
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
      } catch (err) {
        console.log("PEER ERROR createAnswer", err.message);
        if (err?.message?.includes("closed")) {
          createNewPeer();
          return "WAIT";
        }
        return null;
      }
    },
    [peer, createNewPeer]
  );

// 4.0 CODE
  const handleAccept = useCallback(
    async (data) => {
      const otherUserId =
        callState?.to === currentUser?._id ? callState?.from : callState?.to;
      const _offer = data?.offer ? data.offer : callState?.offer;
      let ans = await createAnswer(_offer);
      if (ans === "WAIT") {
        ans = await createAnswer(_offer);
      }
      if (!ans || ans === "WAIT") {
        toast.error("Failed to Connect Call. Please try again.");
        return;
      }

      socket.emit("call:answer", {
        answer: ans,
        userId: currentUser?._id,
        otherUserId,
        state: callState,
      });
    },
    [socket, callState, createAnswer]
  );
  
  
  // 5.2 CODE
  socket.emit("call:connected", {
        userId: currentUser?._id,
        otherUserId,
      });
// Get this event from backend
      socket.broadcast.emit(`call:connected:${data?.userId}`, {
        connected: true,
      });
      socket.broadcast.emit(`call:connected:${data?.otherUserId}`, {
        connected: true,
      });
      
      
// 8.0 CODE
  const getUserMedia = useCallback(async () => {
    let stream = null;
    if (callState?.type === "audio") {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 },
          frameRate: { min: 10, ideal: 20, max: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      stream?.getTracks()?.forEach((track) => {
        if (track?.kind === "video") {
          track.enabled = false;
        }
      });
    }
    if (callState?.type === "video") {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 },
          frameRate: { min: 10, ideal: 20, max: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    }
    if (!stream) return;
    setLocalVideo(stream);
    setOriginalStream(stream);
    const timeout_ms = callState?.to === currentUser?._id ? 500 : 1500;
    setTimeout(() => {
      sendStream(stream);
    }, timeout_ms);

    return stream;
  }, [callState]);
  
  // 8.1 CODE
    const sendStream = useCallback(
    async (stream) => {
      try {
        // console.log("sendStream", stream.getTracks());
        stream.getTracks().forEach((track) => {
          console.log("Adding track to peer:", track);
          peer.addTrack(track, stream);
        });
      } catch (err) {
        console.log("PEER ERROR sendStream", err.message);
      }
    },
    [peer]
  );


// 9.0 CODE
  const handleTrackEvent = useCallback(
    async (event) => {
      const incomingStream = event.streams[0]; // The MediaStream containing the new track
      const incomingTrack = event.track; // The specific new MediaStreamTrack

      console.log("Getting track from peer. Incoming stream:", incomingStream);
      console.log("Incoming track:", incomingTrack);

      // If remoteVideo is not yet set (first track received), just set the whole stream
      if (!remoteVideo) {
        console.log(
          "First remote stream received. Setting remoteVideo directly."
        );
        setRemoteVideo(incomingStream);
        return;
      }

      // If remoteVideo already exists, check for existing tracks of the same kind
      let existingTrackOfSameKind = null;
      if (incomingTrack.kind === "audio") {
        existingTrackOfSameKind = remoteVideo.getAudioTracks()[0];
      } else if (incomingTrack.kind === "video") {
        existingTrackOfSameKind = remoteVideo.getVideoTracks()[0];
      }

      // Check if the incoming track is already part of the current remoteVideo stream
      // This handles cases where the same track might be added again (though uncommon for new 'track' events)
      const isTrackAlreadyInStream = remoteVideo
        .getTracks()
        .some((track) => track.id === incomingTrack.id);

      if (existingTrackOfSameKind && !isTrackAlreadyInStream) {
        console.log(
          `Replacing existing ${incomingTrack.kind} track with new one.`
        );

        // Remove the old track from the current remoteVideo stream
        remoteVideo.removeTrack(existingTrackOfSameKind);
        // Stop the old track to release resources
        existingTrackOfSameKind.stop();

        // Add the new track
        remoteVideo.addTrack(incomingTrack);

        // Trigger a state update to ensure React re-renders the video element if needed
        // By creating a new MediaStream, you force React to re-evaluate srcObject
        setRemoteVideo(new MediaStream(remoteVideo.getTracks()));
      } else if (!existingTrackOfSameKind && !isTrackAlreadyInStream) {
        // If no track of that kind exists and it's a new track, just add it
        console.log(`Adding new ${incomingTrack.kind} track to remoteVideo.`);
        remoteVideo.addTrack(incomingTrack);
        // Trigger a state update
        setRemoteVideo(new MediaStream(remoteVideo.getTracks()));
      } else {
        console.log(
          `Incoming ${incomingTrack.kind} track is already present or duplicate event.`
        );
        // No action needed if the track is already there or it's a duplicate event
      }
    },
    [remoteVideo]
  );
  
  // 10.2 CODE
    const handleNegotiation = useCallback(
    async (data) => {
      // console.log("handleNegotiation data", currentUser?._id);
      if (currentUser?._id === callState?.to) return;

      const otherUserId =
        callState?.to === currentUser?._id ? callState?.from : callState?.to;
      const offer = await createOffer();
      socket.emit("call:negotiation", {
        userId: currentUser?._id,
        otherUserId,
        offer,
      });
    },
    [currentUser, createOffer, callState]
  );

// 11.1 CODE
  const handleIceCandidate = useCallback(
    async (event) => {
      if (!event?.candidate) return;
      // console.log("candidate", event?.candidate);
      // await addIceCandidate(event?.candidate);
      const otherUserId =
        callState?.to === currentUser?._id ? callState?.from : callState?.to;
      socket.emit("call:candidate", {
        userId: currentUser?._id,
        otherUserId,
        candidate: event?.candidate,
      });
    },
    [socket, currentUser, callState]
  );
  // other user addIceCandidate 
    const addIceCandidate = useCallback(
    async (candidate) => {
      try {
        if (!candidate) return;
        console.log("PEER addIceCandidate", candidate);
        if (peer.remoteDescription) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.log("PEER ERROR addIceCandidate", err.message);
      }
    },
    [peer]
  );
  
  
  // 12.0 CODE onCallEnd
    const onCallEnd = useCallback(() => {
    const otherUserId =
      callState?.to === currentUser?._id ? callState?.from : callState?.to;
    socket.emit("call:end", {
      userId: currentUser?._id,
      otherUserId: otherUserId,
      callState,
    });
    onClose?.();
  }, [socket, callState, currentUser, onClose]);

```

FLOW
1. Checking that user online or not, only init call when user online 
2. Init call
	1. Create RTCPeerConnection Offer and call `/api/connect/call` API
	2. When other user init the call, you get this Socket Event 
	   `socket.on("call:currentUserId", handleCall);`
	   and Calling user get this event from Socket
	   `socket.on("call-self:currentUserId", callSelfHandle);`
	3. Show the user to Accept | Reject the call 
		1. When Reject the Call , user should emit this Socket event 
		   `socket.emit("call:reject",userId: currentUserId,otherUserId:otherUserId,callState:callState})`
	4. When Accept the Call create a WebRTC answer (4.0 CODE)
	   `const answer = await peer.createAnswer();`
	   Emit Event `socket.emit("call:answer",Object)`
	5. Answer is sent to Other by this Socket event
	   `socket.on("answer:currentUserId", handleAnswer);`
		1. When get Answer set your `peer.setRemoteDescription(ans)`
		2. After set Remote Description call this Socket Event (5.2 CODE)
		3. After both side are ready to connect the call you will get this event from Socket 
		   `socket.on("call:connected:currentUserId}", handleConnected);`
	6. Next step is to open video/audio call screen and send each other audio/video stream
	7. When init the call, based on type ask audio/video permission to user (8.0 CODE)
	8. send you stream using `webRTC_Peer.addTrack` (8.1 CODE)
	9. Listener webRTC event for add remote track (9.0 CODE)
	   `peer.addEventListener("track", handleTrackEvent);`
	10. Need Negotiation for WebRTC
		1. `peer.addEventListener("negotiationneeded", handleNegotiation);`
		2. Create a offer and set it via Socket (10.2 CODE) to other user
		3. Other user take this Negotiation Offer via this event
		   `socket.on("call:negotiation:currentUserId}", handleAccept);`
	11. icecandidate exchange
		1. `peer.addEventListener("icecandidate", handleIceCandidate);` (11.1 CODE)
	12. To Toggle mute/unmute, video enable/disable use this socket event ` socket.emit("call:status")`
	13. Call Disconnect (12.0 CODE)
	14. `peer.close();`
