import React, { useState, useEffect } from 'react';
import { FiCamera, FiCameraOff } from 'react-icons/fi';
import socketIOClient from 'socket.io-client';
import Webcam from 'react-webcam';
import { Socket } from 'socket.io-client';
import PoseDetector from '../lib/PoseDetector';
import { ENDPOINT } from '../lib/constants';

export const Video = () => {
  let poseDetector, socket;
  const [cameraState, setCameraState] = useState(false);

  useEffect(() => {
    poseDetector = new PoseDetector(loop);
    socket = socketIOClient(ENDPOINT);
    return () => socket.disconnect();
  }, []);

  const loop = async () => {
    let poseData = await poseDetector.poseDetectionFrame();
    if (cameraState) socket.emit(JSON.stringify(poseData));
    requestAnimationFrame(loop);
  };

  return (
    <div id="user-feed">
      <button id="cameraToggle" onClick={() => setCameraState(!cameraState)}>
        {cameraState ? <FiCameraOff /> : <FiCamera />}
      </button>
      <video id="video" playsInline></video>
    </div>
  );
};
