import React from 'react'

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import Base from '../component/Base';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }


function Room() {
    const {roomId} = useParams()

    let myMeeting = async (element) => {
        const appID = 1337461982;
        const serverSecret = "b09c4a30c8a7a43e722501264027fe7d";
       
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,    randomID(5),  randomID(5));
        const zp = ZegoUIKitPrebuilt.create(kitToken);


        zp.joinRoom({
            container: element,
            sharedLinks: [
              {
                name: 'Copy Link',
                url: `http://localhost:3000/room/${roomId}`
              },
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.LiveStreaming, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            // showMyCameraToggleButton: false, // Hide the camera toggle button
            // showMyMicrophoneToggleButton: false, // Hide the microphone toggle button
            // showScreenSharingButton: false, // Hide the screen sharing button
            // turnOnMicrophoneWhenJoining: false,
          });
    
        
    


    }
  return (
    <Base>
   <div   ref={myMeeting}   style={{ width: '100vw', height: '100vh' }}>

   </div>
   </Base>
  )
}

export default Room