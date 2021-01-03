export default class PoseDrawerTwo {
  constructor(two) {
    this.two = two;
    this.videoWidth = 5120;
    this.videoHeight = 2880;
  }

  drawFrame(posesOg, two) {
    // posesOg -> keypoints
    two.clear();
    // let score = poses.score;
    // let keypoints = poses.keypoints;
    let poses = JSON.parse(JSON.stringify(posesOg));
    poses.forEach(({ score, keypoints }) => {
      if (score >= 0.2) {
        // you can also remove the low score entries!! fromm the test data
        // Remove hips and shoulders from skeleton,
        // use only center of both for stick-figure look
        let head = keypoints.splice(1, 4);
        let shoulders = keypoints.splice(1, 2);
        let hips = keypoints.splice(5, 2);

        keypoints.push({
          score: (shoulders[0].score + shoulders[1].score) / 2,
          part: 'middleShoulder',
          position: {
            x: (shoulders[0].position.x + shoulders[1].position.x) / 2,
            y: (shoulders[0].position.y + shoulders[1].position.y) / 2,
          },
        });
        keypoints.push({
          score: (hips[0].score + hips[1].score) / 2,
          part: 'middleHip',
          position: {
            x: (hips[0].position.x + hips[1].position.x) / 2,
            y: (hips[0].position.y + hips[1].position.y) / 2,
          },
        });

        keypoints.push(head[0]);
        keypoints.push(head[1]);

        for (let keypoint of keypoints) {
          // optional
          keypoint.position.x += 300;
          keypoint.position.y += 300;
        }
        this.drawSkeleton(keypoints, 0.65);
      }
    });
  }

  /*
   * Draws a pose skeleton by looking up all adjacent keypoints/joints
   */
  drawSkeleton(keypoints, scale) {
    let color = '#fe53bb';

    // Middle stick
    let middle = this.drawSegment(this.toTuple(keypoints[9].position), this.toTuple(keypoints[10].position));
    // this.two.makeLine(keypoints[9].position.x, keypoints[9].position.y, 126, 352);
    // Left arm
    let leftA1 = this.drawSegment(this.toTuple(keypoints[1].position), this.toTuple(keypoints[3].position));
    let leftA2 = this.drawSegment(this.toTuple(keypoints[1].position), this.toTuple(keypoints[9].position));

    // Right arm
    let rightA1 = this.drawSegment(this.toTuple(keypoints[2].position), this.toTuple(keypoints[4].position));
    let rightA2 = this.drawSegment(this.toTuple(keypoints[2].position), this.toTuple(keypoints[9].position));

    // Left leg
    let leftB1 = this.drawSegment(this.toTuple(keypoints[5].position), this.toTuple(keypoints[7].position));
    let leftB2 = this.drawSegment(this.toTuple(keypoints[5].position), this.toTuple(keypoints[10].position));

    // Right leg
    let rightB1 = this.drawSegment(this.toTuple(keypoints[6].position), this.toTuple(keypoints[8].position));
    let rightB2 = this.drawSegment(this.toTuple(keypoints[6].position), this.toTuple(keypoints[10].position));

    // Neck
    let neckX = keypoints[0].position.x;
    let neckY = keypoints[0].position.y + 40;
    let neckFinal = this.drawSegment([neckY, neckX], this.toTuple(keypoints[9].position));

    // Head
    let headCircle = this.two.makeCircle(keypoints[0].position.x, keypoints[0].position.y, 60);
    headCircle.stroke = 'orangered';
    headCircle.linewidth = 3;
    // Eyes
    let lEye = this.two.makeCircle(keypoints[11].position.x, keypoints[11].position.y, 10);
    let rEye = this.two.makeCircle(keypoints[12].position.x, keypoints[12].position.y, 10);
    // this.two.makeLine(1, 2, 1000, 2000);
    lEye.fill = 'orangered';
    rEye.fill = 'orangered';

    let entireGroup = this.two.makeGroup(middle, leftA1, leftA2, rightA1, rightA2, rightB1, rightB2, leftB1, leftB2, neckFinal, headCircle, lEye, rEye);
    entireGroup.scale = 0.5;
  }

  /*
   * Draws a line on a canvas, i.e. a joint
   */
  drawSegment([ay, ax], [by, bx]) {
    let line = this.two.makeLine(ax, ay, bx, by);
    line.stroke = 'orangered'; // Accepts all valid css color
    line.linewidth = 3;
    return line;
  }

  /*
   * Takes in position object and returns it as array
   */
  toTuple({ y, x }) {
    return [y, x];
  }
}
