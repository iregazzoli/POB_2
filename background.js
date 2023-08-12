const stageWidth = 800;
const stageHeight = 600;

const stage = new Konva.Stage({
  container: "container",
  width: stageWidth,
  height: stageHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const backgroundImage = new Konva.Image({
  image: new Image(), // Create a new Image object to load the image
  width: 471, // Replace with the width of your background image
  height: 472, // Replace with the height of your background image
});

// Load the background image
backgroundImage.image.src = "assets/phos.png";

const numRepetitionsX = Math.ceil(stageWidth / backgroundImage.width());
const numRepetitionsY = Math.ceil(stageHeight / backgroundImage.height());

for (let x = 0; x < numRepetitionsX; x++) {
  for (let y = 0; y < numRepetitionsY; y++) {
    const backgroundClone = backgroundImage.clone({
      x: x * backgroundImage.width(),
      y: y * backgroundImage.height(),
    });
    layer.add(backgroundClone);
  }
}

layer.draw();

stage.on("dragmove", (e) => {
  const dx = e.evt.movementX;
  const dy = e.evt.movementY;
  layer.x(layer.x() + dx);
  layer.y(layer.y() + dy);
  layer.draw();
});

stage.draggable(true);
