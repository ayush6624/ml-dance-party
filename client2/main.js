import PoseDetector from './PoseDetector.js';
import PoseDrawer from './PoseDrawer.js';
import PoseDrawerTwo from './PoseDrawerTwo';
import Stats from 'stats.js';
import Two from 'two.js';

let poseDetector = new PoseDetector(loop);
let personName = 'Anonymous Jimmy';

const socket = io('http://localhost:3030');
// const socket = io('https://dance.ayushgoyal.dev');

socket.on('message', (text) => {
  console.log(text);
});

const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
canvas.width = 1080;
canvas.height = 1920;

let poseDrawer = new PoseDrawer(canvas);

let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

let recording = false;

let frameNo = 0;
async function loop() {
  stats.begin();
  let poseData;
  poseData = await poseDetector.poseDetectionFrame();
  if (recording) {
    poseData[0].name = personName;
    socket.emit('video', JSON.stringify(poseData));
  }
  let blop;
  if (poseData) {
    blop = poseDrawer.drawFrame(poseData);
  }
  stats.end();
  requestAnimationFrame(loop);
  frameNo++;
}

// Screen.js Starts
let canvas2 = document.getElementById('canvas-container');
let two = new Two({
  type: Two.Types.svg,
  width: 600,
  height: 600,
}).appendTo(canvas2);

let poseDrawer2 = new PoseDrawerTwo(two);
let keypoints;

socket.on('video', (data) => {
  keypoints = JSON.parse(data);
});
// keypoints = [poseRecording];

two
  .bind('update', function (frameCount) {
    stats.begin();
    if (keypoints != null) poseDrawer2.drawFrame(keypoints, two);
  })
  .play(); // Finally, start the animation loop

// Screen.js Ends

/*
 * Callbacks
 */
document.getElementById('record-button').onclick = function startRecord() {
  record();
};
document.getElementById('username').addEventListener('change', (e) => {
  personName = e.currentTarget.value;
  console.log(e.currentTarget.value);
});

function record() {
  console.log('start recording');

  let countDownFrom = 3;
  document.getElementById('count-down').innerHTML = 'Ready?';

  let countDown = setInterval(() => {
    document.getElementById('count-down').innerHTML = countDownFrom;

    if (countDownFrom < 1) {
      document.getElementById('count-down').innerHTML = 'dance!!';
      recording = true;
      clearInterval(countDown);
    }

    countDownFrom--;
  }, 1000);
}
