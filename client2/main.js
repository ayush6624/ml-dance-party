import PoseDetector from './PoseDetector.js';
import PoseDrawer from './PoseDrawer.js';
// import PoseDrawerTwo from './PoseDrawerTwo';
import Stats from 'stats.js';

let poseDetector = new PoseDetector(loop);

const socket = io('ws://192.168.1.121:3030');

socket.on('message', (text) => {
  console.log(text);
});
socket.on('connection', (msg) => socket.emit('connected'));

const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
canvas.width = 1080;
canvas.height = 1920;

// let poseDrawer = new PoseDrawerTwo(canvas);

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

/*
 * Callbacks
 */
document.getElementById('record-button').onclick = function startRecord() {
  record();
};

function record() {
  console.log('start recording');

  let countDownFrom = 3;
  document.getElementById('count-down').innerHTML = 'Ready?';

  let countDown = setInterval(() => {
    document.getElementById('count-down').innerHTML = countDownFrom;

    if (countDownFrom < 1) {
      document.getElementById('count-down').innerHTML = 'dance!!';
      clearInterval(countDown);
    }

    countDownFrom--;
  }, 1000);
  recording = true;
}
