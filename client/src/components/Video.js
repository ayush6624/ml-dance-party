import React, { useState, useEffect } from 'react';
import { FiCamera, FiCameraOff } from 'react-icons/fi';
import socketIOClient from 'socket.io-client';
import PoseDetector from '../lib/PoseDetector';
import { ENDPOINT } from '../lib/constants';

export const Video = () => {
  let poseDetector, socket;
  const [cameraState, setCameraState] = useState(false);
  console.log('video component');
  useEffect(() => {
    poseDetector = new PoseDetector(loop);
    console.log('useEffect');
    // socket = socketIOClient(ENDPOINT);
    return () => {
      console.log('closing useffect');
      // socket.disconnect();
    };
  }, []);

  const loop = async () => {
    let poseData = await poseDetector.poseDetectionFrame();
    // if (cameraState) socket.emit(JSON.stringify(poseData));
    console.log('loop');
    requestAnimationFrame(loop);
  };

  return (
    <div id="user-feed">
      <button
        id="cameraToggle"
        onClick={() => {
          console.log('clicked!!!');
          setCameraState(!cameraState);
        }}
      >
        {cameraState ? <FiCameraOff /> : <FiCamera />}
      </button>
      <video id="video" playsInline></video>
    </div>
  );
};
