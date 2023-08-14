const stageWidth = 900;
const stageHeight = 800;
const backgroundImageSrc = "assets/background.png";
const iconImageSrc = "assets/group-background.png";
const skillsSrc = "assets/skills.png";
const frameSrc = "assets/frame.png";

const log = console.log;

let orbitDegrees = [
  90, 60, 45, 30, 0, 330, 315, 300, 270, 240, 225, 210, 180, 150, 135, 120,
];

const desiredBackgroundWidth = 4000;
const desiredBackgroundHeight = 4000;

const stage = new Konva.Stage({
  container: "skillTreeMainCanvas",
  width: stageWidth,
  height: stageHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

function loadBackground() {
  const backgroundImage = new Image(); // Create a new Image object
  backgroundImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = desiredBackgroundWidth;
    canvas.height = desiredBackgroundHeight;

    const context = canvas.getContext("2d");

    const pattern = context.createPattern(backgroundImage, "repeat");
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const konvaBackgroundImage = new Konva.Image({
      image: canvas,
      width: desiredBackgroundWidth,
      height: desiredBackgroundHeight,
    });

    layer.add(konvaBackgroundImage);
    layer.draw();

    stage.on("dragmove", (e) => {
      const minX = 0;
      const minY = 0;
      const maxX = -desiredBackgroundWidth + stageWidth;
      const maxY = -desiredBackgroundHeight + stageHeight;

      let boundedX = Math.min(stage.x(), minX);
      boundedX = Math.max(boundedX, maxX);
      let boundedY = Math.min(stage.y(), minY);
      boundedY = Math.max(boundedY, maxY);

      stage.position({ x: boundedX, y: boundedY });
    });
    stage.draggable(true);
  };

  // Load the background image
  backgroundImage.src = backgroundImageSrc;
}

function loadIcons() {
  const iconImage = new Image();
  iconImage.onload = function () {
    // Create a Konva Image from the cropped icon canvas
    let konvaIconImage = new Konva.Image({
      image: iconImage,
      x: 1000,
      y: 1000,
      width: 240,
      height: 220,
    });

    konvaIconImage.crop({
      x: 0,
      y: 220,
      width: 240,
      height: 220,
    });

    layer.add(konvaIconImage); // Add the cropped icon image to the layer
    layer.draw(); // Redraw the layer
  };

  iconImage.src = iconImageSrc; // Start loading the icon image
}

const skillTree = {
  groups: {
    1: {
      x: 1400,
      y: 1040,
      orbits: [0, 2],
      background: {
        image: "PSGroupBackground2",
      },
      nodes: ["48477", "23507", "57248", "41689", "27276", "62831", "51220"],
    },
  },
  nodes: {
    48477: {
      skill: 48477,
      name: "Attack and Cast Speed",
      icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
      stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
      group: 472,
      orbit: 2,
      orbitIndex: 5,
      out: ["5823"],
      in: ["23507"],
    },
    23507: {
      skill: 23507,
      name: "Attack and Cast Speed",
      icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
      stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
      group: 472,
      orbit: 2,
      orbitIndex: 8,
      out: ["48477"],
      in: ["57248"],
    },
    57248: {
      skill: 57248,
      name: "Attack and Cast Speed",
      icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
      stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
      group: 472,
      orbit: 2,
      orbitIndex: 11,
      out: ["23507"],
      in: ["41689"],
    },
    41689: {
      skill: 41689,
      name: "Physical and Chaos Damage",
      icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
      stats: ["12% increased Chaos Damage", "12% increased Physical Damage"],
      group: 472,
      orbit: 4,
      orbitIndex: 30,
      out: ["45272", "57248"],
      in: ["51220"],
    },
    27276: {
      skill: 27276,
      name: "Physical and Chaos Damage",
      icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
      stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
      group: 472,
      orbit: 2,
      orbitIndex: 3,
      out: ["62831"],
      in: ["5823"],
    },
    62831: {
      skill: 62831,
      name: "Physical and Chaos Damage",
      icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
      stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
      group: 472,
      orbit: 2,
      orbitIndex: 0,
      out: ["51220"],
      in: ["27276"],
    },
    51220: {
      skill: 51220,
      name: "Physical and Chaos Damage",
      icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
      stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
      group: 472,
      orbit: 2,
      orbitIndex: 13,
      out: ["41689"],
      in: ["62831"],
    },
  },
  //this is not like the json
  sprites: {
    "Attack and Cast Speed": {
      x: 806,
      y: 182,
      w: 26,
      h: 26,
      frame: "passive",
    },

    "Physical and Chaos Damage": {
      x: 442,
      y: 156,
      w: 26,
      h: 26,
      frame: "passive",
    },
  },
};

function drawNodeFrame(nodeSprite, nodeX, nodeY) {
  let frameX;
  let frameY;
  let frameWidth;
  let frameHeight;

  if (nodeSprite.frame === "passive") {
    frameX = 325;
    frameY = 230;
    frameWidth = 45;
    frameHeight = 50;
  }

  const nodeFrame = new Image();
  nodeFrame.onload = function () {
    let frameKonva = new Konva.Image({
      image: nodeFrame,
      x: nodeX - 8,
      y: nodeY - 8,
      width: 50,
      height: 50,
    });

    frameKonva.crop({
      x: 325,
      y: 231,
      width: 45,
      height: 45,
    });

    layer.add(frameKonva);
    // layer.draw();
  };

  nodeFrame.src = frameSrc;
}

function drawGroupNodes(nodos, groupX, groupY) {
  const radius = 50;
  for (const nodeId of nodos) {
    const node = skillTree.nodes[nodeId];
    log("node: ", node);
    const nodeSprite = skillTree.sprites[node.name];
    log("nodeSprite: ", nodeSprite);

    //Node position
    let angle;

    //TODO: extract into function
    if (node.orbit === 1) {
      let aux = 1.5 - node.orbitIndex;
      if (aux >= 0) {
        angle = aux * (Math.PI / 3);
      } else {
        angle = (6 + aux) * (Math.PI / 3);
      }
    } else if (node.orbit === 2 || node.orbit === 3) {
      angle = orbitDegrees[node.orbitIndex] * (Math.PI / 180);
    } else if (node.orbit === 4) {
      let aux = 10 - node.orbitIndex;
      if (aux >= 0) {
        angle = aux * (Math.PI / 20);
      } else {
        angle = (40 + aux) * (Math.PI / 20);
      }
    } else if (node.orbit === 5 || node.orbit === 6) {
      let aux = 18 - node.orbitIndex;
      if (aux >= 0) {
        angle = aux * (Math.PI / 36);
      } else {
        angle = (72 + aux) * (Math.PI / 36);
      }
    }

    const nodeX = Math.round(groupX + radius * node.orbit * Math.cos(angle));
    const nodeY = Math.round(groupY + radius * node.orbit * Math.sin(angle));

    log("nodeX: ", nodeX, "nodeY: ", nodeY, "angle: ", angle);

    //Node icon
    const nodeImg = new Image();
    nodeImg.onload = function () {
      let nodeKonva = new Konva.Image({
        image: nodeImg,
        x: nodeX,
        y: nodeY,
        width: nodeSprite.w,
        height: nodeSprite.h,
      });

      nodeKonva.crop({
        x: nodeSprite.x - nodeSprite.w,
        y: nodeSprite.y - nodeSprite.h,
        width: nodeSprite.w,
        height: nodeSprite.h,
      });

      layer.add(nodeKonva);
    };
    nodeImg.src = skillsSrc;

    drawNodeFrame(nodeSprite, nodeX, nodeY);
    layer.draw();
  }
}

function drawGroup(group) {
  let imageX;
  let imageY;
  if (group.background.image === "PSGroupBackground2") {
    imageX = 710;
    imageY = 290;
  }

  const groupBackground = new Image();
  groupBackground.onload = function () {
    let groupBackgroundKonva = new Konva.Image({
      image: groupBackground,
      x: group.x,
      y: group.y,
      width: 200,
      height: 180,
    });
    groupBackgroundKonva.crop({
      x: imageX,
      y: imageY,
      width: 215,
      height: 180,
    });

    layer.add(groupBackgroundKonva);
    layer.draw();

    drawGroupNodes(group.nodes, group.x + imageX / 2, group.y + imageY / 2);
    // group.nodes is the array of the ids of nodes in the group
  };

  groupBackground.src = iconImageSrc;
}

function drawTree(skillTree) {
  for (let group in skillTree.groups) {
    let groupData = skillTree.groups[group];
    drawGroup(groupData);
  }
}

loadBackground();
loadIcons();
drawTree(skillTree);
