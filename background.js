const stageWidth = 900;
const stageHeight = 800;
const backgroundImageSrc = "assets/background-3.png";

const log = console.log;

const desiredBackgroundWidth = 4000;
const desiredBackgroundHeight = 4000;

const stage = new Konva.Stage({
  container: "skillTreeMainCanvas",
  width: stageWidth,
  height: stageHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

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
