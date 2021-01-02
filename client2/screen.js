import Two from 'two.js';
// import recordings from './test1.json';
// import poseRecording from './pose.json';
// import { PoseDrawer as PoseDrawerTwo } from './PoseDrawer.js';
import PoseDrawerTwo from './PoseDrawerTwo.js';

import Stats from 'stats.js';
let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const socket = io('ws://192.168.1.121:3030');

let frameNo = 0;

let canvas = document.getElementById('canvas-container');
let two = new Two({
  type: Two.Types.svg,
  width: 1200,
  height: 1200,
}).appendTo(canvas);

let poseDrawer = new PoseDrawerTwo(two);
let keypoints;

socket.on('video', (data) => {
  console.log('receiving');
  keypoints = JSON.parse(data);
});
// keypoints = [poseRecording];

two
  .bind('update', function (frameCount) {
    console.log('yeah');
    stats.begin();
    if (keypoints != null) poseDrawer.drawFrame(keypoints, two);

    // let currentRecording = recordings[recordings.length - 1];
    // let poseData = currentRecording.frames[frameNo];
    // if (frameNo > currentRecording.frames.length - 2) {
    //   frameNo = 1;
    //   console.log(new Date()); // ~1.5-2 seconds
    // }

    // frameNo++;

    // // poseDrawer.drawFrame(poseData, two);
    stats.end();
  })
  .play(); // Finally, start the animation loop
